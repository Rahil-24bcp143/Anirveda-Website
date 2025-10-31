import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  SITUATIONS_COLLECTION_ID,
  RESPONSES_COLLECTION_ID,
  TEAMS_COLLECTION_ID,
  ID,
} from "../../config/appwrite";
import { Query } from "appwrite";
import SituationCard from "../../components/MockRbi/SituationCard";
import ScoreDisplay from "../../components/MockRbi/ScoreDisplay";

export default function PlayerPanel() {
  const [team, setTeam] = useState(null);
  const [activeSituation, setActiveSituation] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [allTeams, setAllTeams] = useState([]);
  const [canFetchNew, setCanFetchNew] = useState(false);
  const [situationStartTime, setSituationStartTime] = useState(null); // Track when the situation was shown
  const [responseTime, setResponseTime] = useState(null); // Track response time in ms

  const navigate = useNavigate();

  // shuffle util
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchLeaderboard = async () => {
    try {
      // Fetch teams sorted by score
      const response = await databases.listDocuments(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        [Query.orderDesc("Score")]
      );
      
      // Sort teams with the same score by average response time
      const sortedTeams = [...response.documents].sort((a, b) => {
        // First, sort by score (higher scores first)
        if (b.Score !== a.Score) {
          return b.Score - a.Score;
        }
        
        // For teams with the same score, sort by average response time (lower is better)
        // If no response time is recorded, place them below teams with response times
        const aTime = a.averageResponseTime !== undefined ? a.averageResponseTime : Number.MAX_SAFE_INTEGER;
        const bTime = b.averageResponseTime !== undefined ? b.averageResponseTime : Number.MAX_SAFE_INTEGER;
        
        return aTime - bTime;
      });
      
      // Set the top 5 teams
      setAllTeams(sortedTeams.slice(0, 5));
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    const savedTeam = localStorage.getItem("mockrbi-team");
    if (!savedTeam) {
      navigate("/mockrbi/player-login");
      return;
    }
    const teamObj = JSON.parse(savedTeam);
    setTeam(teamObj);
    fetchActiveSituation(teamObj);
    fetchLeaderboard();

    

    const leaderboardInterval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(leaderboardInterval);
  }, [navigate]);

  // timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => {
        const newTime = timeLeft - 1;
        setTimeLeft(newTime);
        sessionStorage.setItem("mockrbi-timer", newTime.toString());
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      if (!submitted) handleAutoSubmit();
      checkIfNewSituationAvailable(); // enable button only if admin pushed new
    }
  }, [timerActive, timeLeft, submitted]);

  useEffect(() => {
    // Poll for new situation only when waiting for admin (button disabled, not timing)
    if (!timerActive && !canFetchNew) {
      const interval = setInterval(() => {
        checkIfNewSituationAvailable();
      }, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [timerActive, canFetchNew]);

  const fetchActiveSituation = async (currentTeam) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SITUATIONS_COLLECTION_ID,
        [Query.equal("isActive", true)]
      );
      if (response.documents.length > 0) {
        const situation = response.documents[0];
        const optionsWithIndices = situation.option.map((opt, index) => ({
          text: opt,
          originalIndex: index,
          weight: situation.weight[index],
        }));
        const shuffled = shuffleArray(optionsWithIndices);
        setShuffledOptions(shuffled);

        const responses = await databases.listDocuments(
          DATABASE_ID,
          RESPONSES_COLLECTION_ID,
          [
            Query.equal("teamId", currentTeam.$id),
            Query.equal("situationId", situation.$id),
          ]
        );

        if (responses.documents.length > 0) {
          setSubmitted(true);
          const originalSelectedIndex = responses.documents[0].selectedOption;
          const shuffledIndex = shuffled.findIndex(
            (opt) => opt.originalIndex === originalSelectedIndex
          );
          setSelectedOption(shuffledIndex);
          setTimerActive(false);
          sessionStorage.removeItem("mockrbi-timer");
          sessionStorage.removeItem("mockrbi-situation-id");
        } else {
          setSubmitted(false);
          setSelectedOption(null);
          const savedSituationId = sessionStorage.getItem("mockrbi-situation-id");
          const savedTimeLeft = sessionStorage.getItem("mockrbi-timer");

          if (savedSituationId === situation.$id && savedTimeLeft) {
            const parsedTime = parseInt(savedTimeLeft, 10);
            setTimeLeft(parsedTime > 0 ? parsedTime : 90);
          } else {
            setTimeLeft(90);
            sessionStorage.setItem("mockrbi-situation-id", situation.$id);
          }
          setTimerActive(true);
          setCanFetchNew(false);
          
          // Track when this situation is presented to the user for response time calculation
          const currentTime = new Date().getTime(); // We keep this as timestamp for easy calculations
          setSituationStartTime(currentTime);
          sessionStorage.setItem("mockrbi-situation-start", currentTime.toString());
        }
        setActiveSituation(situation);
      } else {
        setActiveSituation(null);
        setShuffledOptions([]);
        setTimerActive(false);
        sessionStorage.removeItem("mockrbi-timer");
        sessionStorage.removeItem("mockrbi-situation-id");
        sessionStorage.removeItem("mockrbi-situation-start");
        setCanFetchNew(false);
        setSituationStartTime(null);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load situation");
      setLoading(false);
    }
  };

  const checkIfNewSituationAvailable = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SITUATIONS_COLLECTION_ID,
        [Query.equal("isActive", true)]
      );
      if (response.documents.length > 0) {
        const situation = response.documents[0];
        if (!activeSituation || situation.$id !== activeSituation.$id) {
          setCanFetchNew(true); // enable button only if admin uploaded new
        }
      }
    } catch (err) {
      console.error("Error checking new situation:", err);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null) {
      setError("Please select an option");
      return;
    }
    try {
      const originalIndex = shuffledOptions[selectedOption].originalIndex;
      const scoreAwarded = shuffledOptions[selectedOption].weight;
      
      // Calculate response time in milliseconds
      const now = new Date();
      const respondedAt = now;
      let calculatedResponseTime = 0;
      
      // Use the stored situation start time or the current session's start time
      const startTimeStr = sessionStorage.getItem("mockrbi-situation-start");
      if (startTimeStr && situationStartTime) {
        const startTime = parseInt(startTimeStr, 10);
        calculatedResponseTime = now.getTime() - startTime;
        setResponseTime(calculatedResponseTime);
      }
      
      // Create response document with timing information
      await databases.createDocument(
        DATABASE_ID,
        RESPONSES_COLLECTION_ID,
        ID.unique(),
        {
          teamId: team.$id,
          situationId: activeSituation.$id,
          selectedOption: originalIndex,
          scoreAwarded,
          responseTime: calculatedResponseTime, // Store response time in milliseconds
          respondedAt: respondedAt,
        }
      );
      
      // Update team document with score and timing information
      const updatedScore = team.Score + scoreAwarded;
      
      // Update the team's total response time for tiebreaker purposes
      const currentTotalResponseTime = team.totalResponseTime || 0;
      const updatedTotalResponseTime = currentTotalResponseTime + calculatedResponseTime;
      
      // Update team document with both score and timing data
      await databases.updateDocument(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        team.$id,
        { 
          Score: updatedScore,
          totalResponseTime: updatedTotalResponseTime,
          // Store the average response time for easier display in leaderboard
          averageResponseTime: team.responseCount ? 
            Math.round((updatedTotalResponseTime) / (team.responseCount + 1)) : 
            calculatedResponseTime,
          responseCount: (team.responseCount || 0) + 1
        }
      );
      
      // Update local team data with new score and timing
      team.Score = updatedScore;
      team.totalResponseTime = updatedTotalResponseTime;
      team.responseCount = (team.responseCount || 0) + 1;
      team.averageResponseTime = team.responseCount ? 
        Math.round(team.totalResponseTime / team.responseCount) : 
        calculatedResponseTime;
        
      localStorage.setItem("mockrbi-team", JSON.stringify(team));
      
      setSubmitted(true);
      setTimerActive(false);
      sessionStorage.removeItem("mockrbi-timer");
      sessionStorage.removeItem("mockrbi-situation-id");
      sessionStorage.removeItem("mockrbi-situation-start");
      fetchLeaderboard();
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }
  };

  const handleAutoSubmit = async () => {
    try {
      // For auto-submit (timeout), use the maximum response time (full 90 seconds)
      const maxResponseTime = 90 * 1000; // 90 seconds in milliseconds
      const respondedAt = new Date();
      
      await databases.createDocument(
        DATABASE_ID,
        RESPONSES_COLLECTION_ID,
        ID.unique(),
        {
          teamId: team.$id,
          situationId: activeSituation.$id,
          selectedOption: 0, // Use valid range value, but with 0 score to indicate timeout
          scoreAwarded: 0,
          responseTime: maxResponseTime, // Max response time for timeouts
          respondedAt: respondedAt,
        }
      );
      
      // Update the team's total response time for tiebreaker purposes
      const currentTotalResponseTime = team.totalResponseTime || 0;
      const updatedTotalResponseTime = currentTotalResponseTime + maxResponseTime;
      
      // Update team document with timing data
      await databases.updateDocument(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        team.$id,
        { 
          totalResponseTime: updatedTotalResponseTime,
          averageResponseTime: team.responseCount ? 
            Math.round((updatedTotalResponseTime) / (team.responseCount + 1)) : 
            maxResponseTime,
          responseCount: (team.responseCount || 0) + 1
        }
      );
      
      // Update local team data
      team.totalResponseTime = updatedTotalResponseTime;
      team.responseCount = (team.responseCount || 0) + 1;
      team.averageResponseTime = team.responseCount ? 
        Math.round(team.totalResponseTime / team.responseCount) : 
        maxResponseTime;
        
      localStorage.setItem("mockrbi-team", JSON.stringify(team));
      
      setSubmitted(true);
      setTimerActive(false);
      setSelectedOption(null); // Set to null to show no selection was made
      setResponseTime(maxResponseTime);
      sessionStorage.removeItem("mockrbi-timer");
      sessionStorage.removeItem("mockrbi-situation-id");
      sessionStorage.removeItem("mockrbi-situation-start");
      fetchLeaderboard();
    } catch (err) {
      console.error("Auto-submit failed:", err);
      setError("Failed to process timeout: " + err.message);
    }
  };

  const handleGetNewSituation = () => {
    if (team) {
      fetchActiveSituation(team);
      setTimeLeft(90);
      setTimerActive(true);
      setCanFetchNew(false);
      setResponseTime(null);
      
      // Reset situation start time for new situation
      const currentTime = new Date().getTime(); // Keep as timestamp for calculations
      setSituationStartTime(currentTime);
      sessionStorage.setItem("mockrbi-situation-start", currentTime.toString());
    }
  };

  const handleLogout = async () => {
    try {
      if (team && team.$id) {
        await databases.updateDocument(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          team.$id,
          { isLoggedIn: false }
        );
      }
    } catch (err) {
      console.error("Error updating login status on logout:", err);
    }
    localStorage.removeItem("mockrbi-team");
    navigate("/mock-rbi/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tertiary via-black to-tertiary">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-secondary text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const getTimerColor = () => {
    if (timeLeft > 60) return "text-primary";
    if (timeLeft > 30) return "text-secondary";
    return "text-red-400";
  };

  const getTimerBgColor = () => {
    if (timeLeft > 60) return "bg-primary/10 border-primary/20";
    if (timeLeft > 30) return "bg-secondary/10 border-secondary/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tertiary via-black to-tertiary">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 bg-gradient-to-r from-tertiary/80 to-secondary-opacity/80 backdrop-blur-sm rounded-2xl p-6 border border-secondary/20 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    Team Dashboard
                  </h1>
                  <p className="text-secondary/80 text-lg mt-1">{team.teamName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Enhanced Score Display */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-primary/20 shadow-lg">
                <div className="text-xs text-secondary/70 uppercase tracking-wider mb-1">Current Score</div>
                <div className="text-3xl font-bold text-primary">{team.Score}</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-tertiary/80 text-secondary rounded-xl hover:bg-secondary-opacity/80 transition-all duration-200 border border-secondary/30 hover:border-secondary/50 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Situation Card Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-tertiary/60 to-secondary-opacity/60 backdrop-blur-sm rounded-2xl border border-secondary/20 shadow-2xl overflow-hidden">
              {activeSituation ? (
                <>
                  {/* Timer Display */}
                  {!submitted && timerActive && (
                    <div className={`m-6 p-5 rounded-xl border ${getTimerBgColor()} backdrop-blur-sm transition-all duration-300`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <svg className={`w-6 h-6 ${getTimerColor()}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-secondary/90 font-medium text-sm uppercase tracking-wide">
                            Time Remaining
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-4xl font-bold tabular-nums ${getTimerColor()} tracking-tight`}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="mt-3 h-1.5 bg-secondary-opacity/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${timeLeft > 60 ? 'bg-primary' : timeLeft > 30 ? 'bg-secondary' : 'bg-red-400'} transition-all duration-1000 ease-linear`}
                          style={{ width: `${(timeLeft / 90) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Situation Content */}
                  <div className="p-6">
                    <SituationCard
                      situation={activeSituation}
                      shuffledOptions={shuffledOptions}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      submitted={submitted}
                      handleSubmit={handleSubmit}
                      timeLeft={timeLeft}
                      responseTime={responseTime}
                    />
                  </div>

                  {/* Get New Situation Button */}
                  {submitted && (
                    <div className="px-6 pb-6">
                      <button
                        onClick={handleGetNewSituation}
                        disabled={!canFetchNew}
                        className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                          canFetchNew
                            ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
                            : "bg-tertiary/80 text-secondary/50 cursor-not-allowed border border-secondary/20"
                        }`}
                      >
                        {canFetchNew ? "Get New Situation" : "Waiting for new situation..."}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 px-6">
                  <svg className="w-20 h-20 mx-auto text-secondary/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-xl text-secondary font-medium">
                    No active situation at the moment
                  </p>
                  <p className="text-secondary/60 mt-2 text-sm">
                    Please wait for the administrator to push a new situation
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mini Leaderboard Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-tertiary/60 to-secondary-opacity/60 backdrop-blur-sm rounded-2xl border border-secondary/20 shadow-2xl p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.954 6.221c.394-.141.65-.54.65-.972 0-.623-.418-1.132-1.025-1.132-.503 0-.89.31-1.003.738a.98.98 0 00-.715-.316c-.607 0-1.025.509-1.025 1.132 0 .432.256.831.65 1.053L5 14h10l-4.046-7.779zM5.5 15a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-9z"></path>
                </svg>
                <h3 className="text-lg font-bold text-primary uppercase tracking-wide">Top Teams</h3>
              </div>
              
              <div className="space-y-2.5">
                {allTeams.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-secondary/50 text-sm">No teams registered yet</p>
                  </div>
                ) : (
                  allTeams.map((t, index) => {
                    const isCurrentTeam = t.$id === team.$id;
                    const rankColors = [
                      "from-primary/20 to-primary/10 border-primary/40",
                      "from-secondary/20 to-secondary/10 border-secondary/40",
                      "from-secondary/15 to-secondary/5 border-secondary/30",
                    ];
                    
                    return (
                      <div
                        key={t.$id}
                        className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 border ${
                          isCurrentTeam
                            ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/40 shadow-lg"
                            : index < 3
                            ? `bg-gradient-to-r ${rankColors[index]} hover:scale-[1.02]`
                            : "bg-tertiary/50 border-secondary/20 hover:bg-tertiary/70 hover:border-secondary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                            index === 0 ? "bg-primary/30 text-primary" :
                            index === 1 ? "bg-secondary/30 text-secondary" :
                            index === 2 ? "bg-secondary/20 text-secondary/80" :
                            "bg-secondary-opacity/80 text-secondary/70"
                          }`}>
                            {index + 1}
                          </div>
                          <span
                            className={`font-medium truncate max-w-[120px] ${
                              isCurrentTeam ? "text-primary" : "text-secondary/90"
                            }`}
                          >
                            {t.teamName}
                          </span>
                        </div>
                        <span
                          className={`font-bold text-lg ${
                            isCurrentTeam ? "text-primary" : "text-secondary"
                          }`}
                        >
                          {t.Score}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
              
              <button
                onClick={() => window.open("/mock-rbi/leaderboard", "_blank")}
                className="w-full mt-5 px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-xl hover:from-primary/20 hover:to-secondary/20 transition-all duration-200 font-medium border border-primary/20 hover:border-primary/30 hover:shadow-lg"
              >
                View Full Leaderboard →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

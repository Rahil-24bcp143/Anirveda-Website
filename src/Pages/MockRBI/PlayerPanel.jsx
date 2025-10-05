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
      const response = await databases.listDocuments(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        [Query.orderDesc("Score")]
      );
      setAllTeams(response.documents.slice(0, 5));
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

    

    const leaderboardInterval = setInterval(fetchLeaderboard, 90000);
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
        }
        setActiveSituation(situation);
      } else {
        setActiveSituation(null);
        setShuffledOptions([]);
        setTimerActive(false);
        sessionStorage.removeItem("mockrbi-timer");
        sessionStorage.removeItem("mockrbi-situation-id");
        setCanFetchNew(false);
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

      await databases.createDocument(
        DATABASE_ID,
        RESPONSES_COLLECTION_ID,
        ID.unique(),
        {
          teamId: team.$id,
          situationId: activeSituation.$id,
          selectedOption: originalIndex,
          scoreAwarded,
        }
      );
      const updatedScore = team.Score + scoreAwarded;
      await databases.updateDocument(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        team.$id,
        { Score: updatedScore }
      );
      team.Score = updatedScore;
      localStorage.setItem("mockrbi-team", JSON.stringify(team));
      setSubmitted(true);
      setTimerActive(false);
      sessionStorage.removeItem("mockrbi-timer");
      sessionStorage.removeItem("mockrbi-situation-id");
      fetchLeaderboard();
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }
  };

  const handleAutoSubmit = async () => {
    try {
      // Use 0 as selectedOption for timeout (or any valid index 0-3)
      // scoreAwarded being 0 will indicate it's a timeout
      await databases.createDocument(
        DATABASE_ID,
        RESPONSES_COLLECTION_ID,
        ID.unique(),
        {
          teamId: team.$id,
          situationId: activeSituation.$id,
          selectedOption: 0, // Use valid range value, but with 0 score to indicate timeout
          scoreAwarded: 0,
        }
      );
      setSubmitted(true);
      setTimerActive(false);
      setSelectedOption(null); // Set to null to show no selection was made
      sessionStorage.removeItem("mockrbi-timer");
      sessionStorage.removeItem("mockrbi-situation-id");
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
    return <div className="text-center py-12">Loading...</div>;
  }

  const getTimerColor = () => {
    if (timeLeft > 60) return "text-green-500";
    if (timeLeft > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Team Dashboard</h1>
            <h2 className="text-xl text-secondary">{team.teamName}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <ScoreDisplay score={team.Score} />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-secondary/20 text-secondary rounded-md hover:bg-secondary/30"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-tertiary p-6 rounded-lg shadow-md">
              {activeSituation ? (
                <>
                  {!submitted && timerActive && (
                    <div className="mb-4 p-4 bg-secondary/10 rounded-lg flex items-center justify-between">
                      <span className="text-secondary font-semibold">
                        Time Remaining:
                      </span>
                      <span
                        className={`text-3xl font-bold ${getTimerColor()}`}
                      >
                        {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <SituationCard
                    situation={activeSituation}
                    shuffledOptions={shuffledOptions}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    submitted={submitted}
                    handleSubmit={handleSubmit}
                    timeLeft={timeLeft}
                  />

                  {/* Get New Situation button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleGetNewSituation}
                      disabled={!canFetchNew}
                      className={`px-4 py-2 rounded-md ${
                        canFetchNew
                          ? "bg-primary text-white hover:bg-primary/80"
                          : "bg-secondary/20 text-secondary cursor-not-allowed"
                      }`}
                    >
                      Get New Situation
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-secondary">
                    No active situation at the moment.
                  </p>
                  <p className="text-secondary/70 mt-2">
                    Wait for the administrator to push a new situation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mini Leaderboard - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-tertiary p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.954 6.221c.394-.141.65-.54.65-.972 0-.623-.418-1.132-1.025-1.132-.503 0-.89.31-1.003.738a.98.98 0 00-.715-.316c-.607 0-1.025.509-1.025 1.132 0 .432.256.831.65 1.053L5 14h10l-4.046-7.779zM5.5 15a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-9z"></path>
                </svg>
                Top 5 Teams
              </h3>
              <div className="space-y-3">
                {allTeams.length === 0 ? (
                  <p className="text-secondary/70 text-sm">No teams yet</p>
                ) : (
                  allTeams.map((t, index) => {
                    const isCurrentTeam = t.$id === team.$id;
                    return (
                      <div
                        key={t.$id}
                        className={`flex items-center justify-between p-3 rounded-md ${
                          isCurrentTeam
                            ? "bg-primary/20 border border-primary/40"
                            : "bg-secondary/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-lg font-bold ${
                              index === 0
                                ? "text-yellow-500"
                                : index === 1
                                ? "text-gray-400"
                                : index === 2
                                ? "text-orange-600"
                                : "text-secondary"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span
                            className={`font-medium ${
                              isCurrentTeam ? "text-primary" : "text-secondary"
                            } truncate max-w-[120px]`}
                          >
                            {t.teamName}
                          </span>
                        </div>
                        <span
                          className={`font-bold ${
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
                className="w-full mt-4 px-4 py-2 bg-primary/20 text-primary rounded-md hover:bg-primary/30 text-sm font-medium"
              >
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

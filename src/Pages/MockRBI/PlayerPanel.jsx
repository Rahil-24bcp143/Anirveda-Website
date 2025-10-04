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
      await databases.createDocument(
        DATABASE_ID,
        RESPONSES_COLLECTION_ID,
        ID.unique(),
        {
          teamId: team.$id,
          situationId: activeSituation.$id,
          selectedOption: -1,
          scoreAwarded: 0,
        }
      );
      setSubmitted(true);
      sessionStorage.removeItem("mockrbi-timer");
      sessionStorage.removeItem("mockrbi-situation-id");
      setError("Time's up! No points awarded.");
      fetchLeaderboard();
    } catch (err) {
      console.error("Auto-submit failed:", err);
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

          {/* Leaderboard column stays unchanged */}
        </div>
      </div>
    </div>
  );
}

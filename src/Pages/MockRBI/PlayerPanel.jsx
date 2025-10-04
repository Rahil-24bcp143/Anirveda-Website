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
  const [lastSituationId, setLastSituationId] = useState(null);
  const [hasNewSituation, setHasNewSituation] = useState(false);

  const navigate = useNavigate();

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
  }, [navigate]);

  const fetchActiveSituation = async (currentTeam) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SITUATIONS_COLLECTION_ID,
        [Query.equal("isActive", true)]
      );

      if (response.documents.length > 0) {
        const situation = response.documents[0];
        
        // Create shuffled options with original indices
        const optionsWithIndices = situation.option.map((opt, index) => ({
          text: opt,
          originalIndex: index,
          weight: situation.weight[index]
        }));
        const shuffled = shuffleArray(optionsWithIndices);
        setShuffledOptions(shuffled);
        

        // detect new situation
        if (situation.$id !== lastSituationId) {
          setHasNewSituation(true);
        } else {
          setHasNewSituation(false);
        }

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
          // Find the shuffled index that matches the original selected index
          const originalSelectedIndex = responses.documents[0].selectedOption;
          const shuffledIndex = shuffled.findIndex(opt => opt.originalIndex === originalSelectedIndex);
          setSelectedOption(shuffledIndex);
        } else {
          setSubmitted(false);
          setSelectedOption(null);
        }

        setActiveSituation(situation);
        setLastSituationId(situation.$id);
      } else {
        setActiveSituation(null);
        setShuffledOptions([]);
        setHasNewSituation(false);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load situation");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null) {
      setError("Please select an option");
      return;
    }
    try {
      // Get the original index from the shuffled option
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
        {
          Score: updatedScore,
        }
      );
      team.Score = updatedScore;
      localStorage.setItem("mockrbi-team", JSON.stringify(team));
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      if (team && team.$id) {
        await databases.updateDocument(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          team.$id,
          {
            isLoggedIn: false,
          }
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

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Team Dashboard</h1>
            <h2 className="text-xl text-secondary">{team.teamName}</h2>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
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

        <div className="bg-tertiary p-6 rounded-lg shadow-md">
          {activeSituation ? (
            <>
              <SituationCard
                situation={activeSituation}
                shuffledOptions={shuffledOptions}
            selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                submitted={submitted}
                handleSubmit={handleSubmit}
              />

              {/* Get New Question Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => fetchActiveSituation(team)}
                  disabled={!hasNewSituation}
                  className={`px-4 py-2 rounded-md ${
                    hasNewSituation
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-secondary/20 text-secondary cursor-not-allowed"
                  }`}
                >
                  Get New Question
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
    </div>
  );
}

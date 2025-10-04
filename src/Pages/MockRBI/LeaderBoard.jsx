import { useState, useEffect } from "react";
import { databases, DATABASE_ID, TEAMS_COLLECTION_ID } from "../../config/appwrite";
import { Query } from "appwrite";

export default function LeaderBoard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
    const interval = setInterval(fetchTeams, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        [Query.orderDesc("Score")]
      );
      setTeams(response.documents);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Function to get the appropriate glow class based on rank
  const getGlowClass = (index) => {
    if (index === 0) return "gold-glow bg-primary-10";
    if (index === 1) return "silver-glow bg-secondary-15";
    if (index === 2) return "bronze-glow bg-secondary-15";
    return "";
  };

  // Function to get text color based on rank
  const getTextColor = (index) => {
    if (index === 0) return "text-primary";
    return "text-secondary";
  };

  // Function to get avatar placeholder
  const getAvatarInitials = (teamName) => {
    return teamName
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6" style={{ 
      background: 'radial-gradient(circle at center, #161616, #0F0F0F)'
    }}>
      <style>{`
        :root {
          --primary: #C9872B;
          --secondary: #B69575;
          --secondary-opacity-bg: #161616;
          --secondary-15-bg: rgba(182, 149, 117, 0.15);
          --tertiary-bg: #0F0F0F;
        }

        .text-primary { color: var(--primary); }
        .text-secondary { color: var(--secondary); }
        .border-primary { border-color: var(--primary); }
        .border-secondary { border-color: var(--secondary); }

        .bg-primary-10 { background-color: rgba(201, 135, 43, 0.08); }
        .bg-secondary-15 { background-color: var(--secondary-15-bg); }

        .gold-glow {
          box-shadow: 0 2px 8px rgba(201, 135, 43, 0.15);
          border-left: 3px solid rgba(201, 135, 43, 0.6);
        }
        .silver-glow {
          box-shadow: 0 2px 6px rgba(182, 149, 117, 0.12);
          border-left: 3px solid rgba(182, 149, 117, 0.5);
        }
        .bronze-glow {
          box-shadow: 0 2px 4px rgba(182, 149, 117, 0.1);
          border-left: 3px solid rgba(182, 149, 117, 0.4);
        }

        .player-row:hover {
          background-color: var(--secondary-15-bg);
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .leaderboard-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .leaderboard-scroll {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Main Leaderboard Container */}
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 
            className="text-4xl sm:text-5xl font-bold text-primary" 
            style={{ textShadow: '0 2px 4px rgba(201, 135, 43, 0.3)' }}
          >
            Participating Teams
          </h1>
          <p className="text-secondary mt-2 text-lg">Ranking based on current scores</p>
        </header>

        {/* Leaderboard Card */}
        <main 
          style={{ 
            backgroundColor: 'rgba(22, 22, 22, 0.75)', 
            borderColor: 'rgba(201, 135, 43, 0.2)' 
          }} 
          className="backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border"
        >
          {/* Header Row */}
          <div 
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b text-secondary font-semibold uppercase text-sm" 
            style={{ borderColor: 'rgba(201, 135, 43, 0.2)' }}
          >
            <div className="col-span-2">Rank</div>
            <div className="col-span-7">Team</div>
            <div className="col-span-3 text-right">Score</div>
          </div>

          {/* Player List */}
          <div 
            className="divide-y max-h-[60vh] overflow-y-auto leaderboard-scroll" 
            style={{ borderColor: 'rgba(182, 149, 117, 0.1)' }}
          >
            {teams.length === 0 ? (
              <div className="px-6 py-8 text-center text-secondary">
                No teams have registered yet
              </div>
            ) : (
              teams.map((team, index) => {
                const rank = index + 1;
                const isTopThree = index < 3;
                const avatarInitials = getAvatarInitials(team.teamName);

                return (
                  <div
                    key={team.$id}
                    className={`grid grid-cols-12 gap-4 items-center px-6 ${
                      isTopThree ? 'py-4' : 'py-3'
                    } ${getGlowClass(index)} transition-transform duration-300 hover:scale-[1.02] ${
                      !isTopThree ? 'player-row' : ''
                    }`}
                  >
                    {/* Rank Column */}
                    <div className="col-span-2 flex items-center gap-3">
                      <span 
                        className={`${
                          isTopThree ? 'text-2xl' : 'text-lg'
                        } font-bold ${getTextColor(index)} ${
                          !isTopThree && 'opacity-70'
                        }`}
                      >
                        {rank}
                      </span>
                      {/* Crown Icon for 1st place */}
                      {index === 0 && (
                        <svg 
                          className="w-6 h-6 text-primary" 
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11.954 6.221c.394-.141.65-.54.65-.972 0-.623-.418-1.132-1.025-1.132-.503 0-.89.31-1.003.738a.98.98 0 00-.715-.316c-.607 0-1.025.509-1.025 1.132 0 .432.256.831.65 1.053L5 14h10l-4.046-7.779zM5.5 15a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-9z"></path>
                        </svg>
                      )}
                    </div>

                    {/* Team Name Column */}
                    <div className="col-span-7 flex items-center gap-4">
                      <div 
                        className={`w-10 h-10 rounded-full border-2 ${
                          index === 0 ? 'border-primary' : 'border-secondary'
                        } ${!isTopThree && 'opacity-50'} flex items-center justify-center font-bold text-xs`}
                        style={{ 
                          backgroundColor: '#0F0F0F',
                          color: index === 0 ? '#C9872B' : '#B69575'
                        }}
                      >
                        {avatarInitials}
                      </div>
                      <span 
                        className={`${
                          index === 0 ? 'font-bold text-white text-lg' : 
                          isTopThree ? 'font-semibold text-gray-200' : 
                          'font-medium text-secondary'
                        }`}
                      >
                        {team.teamName}
                      </span>
                    </div>

                    {/* Score Column */}
                    <div 
                      className={`col-span-3 text-right font-bold ${
                        isTopThree ? 'text-xl' : 'text-lg'
                      } ${
                        index === 0 ? 'text-2xl text-primary' : getTextColor(index)
                      }`}
                    >
                      {team.Score}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

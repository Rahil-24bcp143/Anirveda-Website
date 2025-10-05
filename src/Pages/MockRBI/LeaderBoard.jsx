import { useState, useEffect, useRef } from "react";
import { databases, DATABASE_ID, TEAMS_COLLECTION_ID } from "../../config/appwrite";
import { Query } from "appwrite";

export default function LeaderBoard() {
  const [teams, setTeams] = useState([]);
  const [rankChanges, setRankChanges] = useState({});
  const previousRanksRef = useRef({});

  useEffect(() => {
    fetchTeams();
    const interval = setInterval(fetchTeams, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        [Query.orderDesc("Score")]
      );
      
      const newTeams = response.documents;
      
      const changes = {};
      const newRanks = {};

      newTeams.forEach((team, index) => {
        const newRank = index + 1;
        newRanks[team.$id] = newRank;
        const oldRank = previousRanksRef.current[team.$id];
        
        if (oldRank !== undefined && oldRank !== newRank) {
          changes[team.$id] = newRank < oldRank ? 'up' : 'down';
        }
      });
      
      if (Object.keys(previousRanksRef.current).length > 0) {
        setRankChanges(changes);
      }
      
      previousRanksRef.current = newRanks;
      setTeams(newTeams);
      
      if (Object.keys(changes).length > 0) {
        setTimeout(() => setRankChanges({}), 2000);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
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
  
  const topThree = teams.slice(0, 3);
  const restOfTeams = teams.slice(3);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 font-sans" style={{ 
      background: 'radial-gradient(circle at center, #161616, #0F0F0F)',
      color: '#B69575'
    }}>
      <style>{`
        :root {
          --primary: #C9872B;
          --secondary: #B69575;
          --tertiary-bg: #0F0F0F;
          --card-bg: rgba(22, 22, 22, 0.75);
          --border-color: rgba(201, 135, 43, 0.2);
          --border-color-secondary: rgba(182, 149, 117, 0.1);
        }

        .text-primary { color: var(--primary); }
        .text-secondary { color: var(--secondary); }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes rankUp {
          0% { background-color: rgba(4, 120, 87, 0.2); transform: translateY(5px); }
          100% { background-color: transparent; transform: translateY(0); }
        }

        @keyframes rankDown {
          0% { background-color: rgba(153, 27, 27, 0.2); transform: translateY(-5px); }
          100% { background-color: transparent; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(201, 135, 43, 0.3); }
          50% { box-shadow: 0 0 28px rgba(201, 135, 43, 0.6); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .rank-up-anim { animation: rankUp 1.5s ease-out; }
        .rank-down-anim { animation: rankDown 1.5s ease-out; }
        .top-rank-glow { animation: pulse-glow 3s ease-in-out infinite; }

        /* Custom scrollbar */
        .leaderboard-scroll::-webkit-scrollbar { width: 4px; }
        .leaderboard-scroll::-webkit-scrollbar-track { background: transparent; }
        .leaderboard-scroll::-webkit-scrollbar-thumb { background: rgba(182, 149, 117, 0.2); border-radius: 4px; }
        .leaderboard-scroll::-webkit-scrollbar-thumb:hover { background: rgba(182, 149, 117, 0.4); }
      `}</style>

      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-10 animate-fade-in">
            <div className="flex justify-center items-center gap-4">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.622 3.003a.75.75 0 00-1.244 0l-1.125 2.16-2.52.367a.75.75 0 00-.416 1.279l1.823 1.776-.43 2.51a.75.75 0 001.088.791l2.253-1.185 2.253 1.185a.75.75 0 001.088-.79l-.43-2.51 1.823-1.777a.75.75 0 00-.416-1.28l-2.52-.366-1.125-2.16zM3.375 9.188a.75.75 0 00-1.088.791l.43 2.51L.9 14.266a.75.75 0 00.416 1.28l2.52.366 1.125 2.16a.75.75 0 001.244 0l1.125-2.16 2.52-.366a.75.75 0 00.416-1.28L8.4 12.49l-.43-2.51a.75.75 0 00-1.088-.79L4.625 10.37l-1.25-1.182zM16.625 9.188a.75.75 0 00-1.088.791l.43 2.51-1.823 1.777a.75.75 0 00.416 1.28l2.52.366 1.125 2.16a.75.75 0 001.244 0l1.125-2.16 2.52-.366a.75.75 0 00.416-1.28l-1.823-1.777.43-2.51a.75.75 0 00-1.088-.79l-2.253 1.185-1.25-1.182z" clipRule="evenodd"></path></svg>
                <h1 className="text-4xl sm:text-5xl font-bold text-primary" style={{ textShadow: '0 2px 8px rgba(201, 135, 43, 0.3)' }}>
                    Team Leaderboard
                </h1>
            </div>
            <p className="text-secondary mt-3 text-lg">Real-time rankings based on scores</p>
        </header>

        {/* Podium Section for Top 3 */}
        {topThree.length > 0 && (
          <section className="flex flex-col sm:flex-row justify-center items-end gap-4 sm:gap-2 md:gap-4 mb-10">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="w-full sm:w-1/4 order-2 sm:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-card-bg p-5 rounded-xl border border-secondary/30 text-center flex flex-col items-center shadow-lg">
                  <span className="text-4xl font-bold" style={{color: '#C0C0C0'}}>2</span>
                  <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center font-bold text-2xl my-3" style={{borderColor: '#C0C0C0', backgroundColor: '#0F0F0F', color: '#C0C0C0'}}>{getAvatarInitials(topThree[1].teamName)}</div>
                  <p className="font-bold text-lg text-gray-200 truncate w-full">{topThree[1].teamName}</p>
                  <p className="text-primary text-xl font-semibold mt-1">{topThree[1].Score}</p>
                </div>
              </div>
            )}
            {/* 1st Place */}
            {topThree[0] && (
              <div className="w-full sm:w-1/3 order-1 sm:order-2 animate-fade-in">
                <div className="bg-card-bg p-6 rounded-t-2xl border-2 border-primary text-center flex flex-col items-center shadow-2xl top-rank-glow">
                  <svg className="w-10 h-10 text-primary -mt-12" fill="currentColor" viewBox="0 0 20 20"><path d="M11.954 6.221c.394-.141.65-.54.65-.972 0-.623-.418-1.132-1.025-1.132-.503 0-.89.31-1.003.738a.98.98 0 00-.715-.316c-.607 0-1.025.509-1.025 1.132 0 .432.256.831.65 1.053L5 14h10l-4.046-7.779zM5.5 15a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-9z"></path></svg>
                  <span className="text-5xl font-bold text-primary">1</span>
                  <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center font-bold text-3xl my-4" style={{backgroundColor: '#0F0F0F', color: '#C9872B'}}>{getAvatarInitials(topThree[0].teamName)}</div>
                  <p className="font-bold text-2xl text-white truncate w-full">{topThree[0].teamName}</p>
                  <p className="text-primary text-3xl font-bold mt-2">{topThree[0].Score}</p>
                </div>
              </div>
            )}
            {/* 3rd Place */}
            {topThree[2] && (
              <div className="w-full sm:w-1/4 order-3 sm:order-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-card-bg p-5 rounded-xl border border-secondary/30 text-center flex flex-col items-center shadow-lg">
                  <span className="text-4xl font-bold" style={{color: '#CD7F32'}}>3</span>
                  <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center font-bold text-2xl my-3" style={{borderColor: '#CD7F32', backgroundColor: '#0F0F0F', color: '#CD7F32'}}>{getAvatarInitials(topThree[2].teamName)}</div>
                  <p className="font-bold text-lg text-gray-200 truncate w-full">{topThree[2].teamName}</p>
                  <p className="text-primary text-xl font-semibold mt-1">{topThree[2].Score}</p>
                </div>
              </div>
            )}
          </section>
        )}
        
        {/* Main Ranking List */}
        <main style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }} className="backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b text-secondary font-semibold uppercase text-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Team</div>
            <div className="col-span-4 text-right">Score</div>
          </div>
          <div className="max-h-[45vh] overflow-y-auto leaderboard-scroll space-y-1 p-2">
            {teams.length === 0 ? (
              <div className="px-6 py-8 text-center text-secondary">No teams have registered yet</div>
            ) : restOfTeams.length === 0 && topThree.length > 0 ? (
              <div className="px-6 py-8 text-center text-secondary">Only the top teams are competing!</div>
            ) : (
              restOfTeams.map((team, index) => {
                const rank = index + 4;
                const rankChange = rankChanges[team.$id];
                const animationClass = rankChange === 'up' ? 'rank-up-anim' : rankChange === 'down' ? 'rank-down-anim' : '';

                return (
                  <div
                    key={team.$id}
                    className={`grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg transition-colors hover:bg-white/5 ${animationClass}`}
                    style={{ animationDelay: `${index * 50}ms`, opacity: 0, animation: `fadeIn 0.5s ease-out forwards ${index * 50}ms`}}
                  >
                    <div className="col-span-2 flex items-center">
                      <span className="text-lg font-bold text-secondary opacity-80 w-8 text-center">{rank}</span>
                      {rankChange === 'up' && <svg className="w-5 h-5 text-green-400 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" /></svg>}
                      {rankChange === 'down' && <svg className="w-5 h-5 text-red-400 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" /></svg>}
                    </div>
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full border-2 border-secondary/50 flex items-center justify-center font-bold text-xs" style={{backgroundColor: '#0F0F0F', color: '#B69575'}}>{getAvatarInitials(team.teamName)}</div>
                      <span className="font-medium text-gray-300">{team.teamName}</span>
                    </div>
                    <div className="col-span-4 text-right font-semibold text-lg text-secondary">{team.Score}</div>
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

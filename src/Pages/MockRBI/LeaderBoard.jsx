import { useState, useEffect } from "react";
import { databases, DATABASE_ID, TEAMS_COLLECTION_ID } from "../../config/appwrite";
import { Query } from "appwrite";

export default function LeaderBoard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          [
            Query.orderDesc("Score"),
          ]
        );
        setTeams(response.documents);
        setLoading(false);
      } catch (err) {
        setError("Failed to load leaderboard");
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Mock RBI Leaderboard</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-tertiary p-6 rounded-lg shadow-md">
          {teams.length === 0 ? (
            <p className="text-center text-secondary">No teams have registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary/30">
                <thead className="bg-secondary/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/30">
                  {teams.map((team, index) => (
                    <tr key={team.$id} className={index === 0 ? "bg-primary/10" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary">
                        {index + 1}
                        {index === 0 && <span className="ml-1">🏆</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary">{team.teamName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-primary">{team.Score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

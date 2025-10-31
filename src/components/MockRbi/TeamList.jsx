import { useState, useEffect } from "react";
import { databases, DATABASE_ID, TEAMS_COLLECTION_ID } from "../../config/appwrite";
import { Query } from "appwrite";

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, TEAMS_COLLECTION_ID, [
          Query.orderDesc("Score"),
        ]);
        setTeams(response.documents);
        setLoading(false);
      } catch (err) {
        setError("Failed to load teams");
        setLoading(false);
      }
    };

    fetchTeams();

    const intervalId = setInterval(() => {
      fetchTeams();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-tertiary p-6 rounded-lg border border-secondary/30 shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4">Participating Teams</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {teams.length === 0 ? (
            <p className="text-center text-secondary/70 py-4">No teams registered yet</p>
          ) : (
            <table className="min-w-full divide-y divide-secondary/30">
              <thead className="bg-secondary/10">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Rank</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Team</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-secondary uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/30">
                {teams.map((team, index) => (
                  <tr key={team.$id} className={index === 0 ? "bg-primary/10" : ""}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary">{index + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary">{team.teamName}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-bold text-primary">{team.Score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

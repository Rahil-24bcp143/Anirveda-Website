import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, DATABASE_ID, TEAMS_COLLECTION_ID, ID } from "../../config/appwrite";
import { Query } from "appwrite";

export default function PlayerLogin() {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    console.log("Attempting to register/login with:", { teamName, isRegistering });
    
    try {
      if (isRegistering) {
        console.log("Checking if team exists...");
        const teams = await databases.listDocuments(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          [
            Query.equal("teamName", teamName),
          ]
        );
        console.log("Found teams:", teams);
        
        if (teams.documents.length > 0) {
          setError("Team name already exists");
          return;
        }
        
        console.log("Creating new team...");
        const team = await databases.createDocument(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          ID.unique(),
          {
            teamName,
            password,
            Score: 0,
          }
        );
        console.log("Team created:", team);
        localStorage.setItem("mockrbi-team", JSON.stringify(team));
        navigate("/mockrbi/player-panel");
      } else {
        const teams = await databases.listDocuments(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          [
            Query.equal("teamName", teamName),
          ]
        );
        if (teams.documents.length === 0) {
          setError("Team not found");
          return;
        }
        const team = teams.documents[0];
        if (team.password !== password) {
          setError("Incorrect password");
          return;
        }
        localStorage.setItem("mockrbi-team", JSON.stringify(team));
        navigate("/mockrbi/player-panel");
      }
    } catch (err) {
      console.error("Error during registration/login:", err);
      setError("An error occurred: " + err.message);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Mock RBI Challenge</h1>
      <div className="bg-tertiary p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          {isRegistering ? "Register Team" : "Team Login"}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary mb-2">Team Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-secondary/30 rounded-md bg-tertiary text-secondary"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-secondary mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-secondary/30 rounded-md bg-tertiary text-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Already have a team? Login" : "Create a new team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

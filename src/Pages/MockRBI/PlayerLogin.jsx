import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, DATABASE_ID, TEAMS_COLLECTION_ID, ID } from "../../config/appwrite";
import { Query } from "appwrite";
import { Button } from "../../components/ui/moving-border";

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
        navigate("/mock-rbi/playerpanel");
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
        navigate("/mock-rbi/playerpanel");
      }
    } catch (err) {
      console.error("Error during registration/login:", err);
      setError("An error occurred: " + err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="container mx-auto max-w-lg">
        {/* Title Section: Made more prominent and spaced */}
        <h1 className="text-4xl font-extrabold text-primary mb-16 text-center tracking-wider drop-shadow-lg animate-fadeInDown">
          Mock RBI Challenge
        </h1>

        {/* Card Container: Added a subtle glow and more rounded corners */}
        <div className="bg-tertiary/90 p-8 sm:p-10 rounded-xl shadow-2xl border border-primary/20 backdrop-blur-sm transform transition duration-500 hover:shadow-primary/50">
          
          {/* Form Header */}
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center border-b pb-4 border-primary/50">
            {isRegistering ? "Secure Team Registration" : "Team Access Portal"}
          </h2>

          {/* Error Message: Styled more like an alert box */}
          {error && (
            <div className="bg-red-900/50 border border-red-400 text-red-300 px-5 py-3 rounded-lg mb-6 font-medium transition duration-300 ease-in-out">
              <span className="font-bold mr-2">Error:</span> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Team Name Input */}
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2 uppercase tracking-wider">
                Team Name
              </label>
              <input
                type="text"
                className="w-full px-5 py-3 border border-secondary/20 rounded-lg bg-black/30 text-secondary placeholder-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition duration-200"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                placeholder="Enter your unique team name"
              />
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                className="w-full px-5 py-3 border border-secondary/20 rounded-lg bg-black/30 text-secondary placeholder-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Secure password"
              />
            </div>
            
            {/* Submit Button: Correctly styled with proper animation */}
            <div className="mt-8">
              <Button
                type="submit"
                borderClassName="bg-[radial-gradient(#C9872B_40%,transparent_60%)]"
                containerClassName="w-full h-12"
                className="w-full bg-primary text-white font-bold text-base rounded-md"
                duration={2000}
                borderRadius="0.375rem"
              >
                {isRegistering ? "Register Team & Proceed" : "Login & Start Challenge"}
              </Button>
            </div>
            <div className="pt-4 text-center">
              <button
                type="button"
                className="text-secondary/70 text-sm transition-all duration-200 hover:text-primary hover:underline underline-offset-4"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "Already have a team? Log in here." : "New to the challenge? Create a team."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

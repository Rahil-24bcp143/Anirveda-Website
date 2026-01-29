import { useState, useEffect } from "react";
import { databases, DATABASE_ID, SITUATIONS_COLLECTION_ID, ID } from "../../config/appwrite";
import { Query } from "appwrite";

export default function AdminSituationForm() {
  const [situations, setSituations] = useState([]);
  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState(["", "", "", ""]);
  const [weight, setWeight] = useState([10, 5, -5, -10]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSituations = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, SITUATIONS_COLLECTION_ID);
        setSituations(response.documents);
        if (response.documents.length > 0) {
          const maxRound = Math.max(...response.documents.map((doc) => doc.round));
          setRound(maxRound + 1);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load situations");
        setLoading(false);
      }
    };
    fetchSituations();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOption = [...option];
    newOption[index] = value;
    setOption(newOption);
  };

  const handleWeightChange = (index, value) => {
    const newWeight = [...weight];
    newWeight[index] = parseInt(value, 10) || 0;
    setWeight(newWeight);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setError("");
    setSuccess("");

    if (!question || option.some((opt) => !opt) || weight.length !== 4 || option.length !== 4) {
      setError("Please fill all fields and ensure 4 options with weights");
      return;
    }

    setIsSubmitting(true);

    try {
      const activeSituations = await databases.listDocuments(DATABASE_ID, SITUATIONS_COLLECTION_ID, [
        Query.equal("isActive", true),
      ]);

      for (const doc of activeSituations.documents) {
        await databases.updateDocument(DATABASE_ID, SITUATIONS_COLLECTION_ID, doc.$id, { isActive: false });
      }

      const newSituation = await databases.createDocument(DATABASE_ID, SITUATIONS_COLLECTION_ID, ID.unique(), {
        round,
        question,
        option,
        weight,
        isActive: true,
        publishedAt: new Date().toISOString(), // Add timestamp when the situation is published
      });

      setSituations([...situations, newSituation]);
      setSuccess("Situation created and pushed to teams!");

      setQuestion("");
      setOption(["", "", "", ""]);
      setWeight([10, 5, -5, -10]);
      setRound((prevRound) => prevRound + 1);
    } catch (err) {
      setError("Failed to create situation: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-tertiary p-6 rounded-lg border border-secondary/30 shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4">Create New Situation</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-secondary mb-2">Round</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-secondary/30 rounded-md bg-tertiary text-secondary"
              value={round}
              onChange={(e) => setRound(parseInt(e.target.value, 10) || 1)}
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-secondary mb-2">Question/Situation</label>
            <textarea
              className="w-full px-3 py-2 border border-secondary/30 rounded-md bg-tertiary text-secondary"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="3"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-secondary mb-3">Options & Weights</h3>

          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="block text-secondary mb-1">Option {index + 1}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-secondary/30 rounded-md bg-tertiary text-secondary"
                  value={option[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>

              <div className="w-24">
                <label className="block text-secondary mb-1">Weight</label>
                <select
                  className="w-full px-3 py-2 border border-secondary/30 rounded-md bg-tertiary text-secondary"
                  value={weight[index]}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  required
                >
                  <option value="10">+10</option>
                  <option value="5">+5</option>
                  <option value="0">0</option>
                  <option value="-5">-5</option>
                  <option value="-10">-10</option>
                </select>
              </div>
            </div>
          ))}
        </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded-md transition-all ${isSubmitting
              ? 'bg-primary/50 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/80'
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Pushing...
            </span>
          ) : (
            'Push Situation to Teams'
          )}
        </button>
      </form>
    </div>
  );
}

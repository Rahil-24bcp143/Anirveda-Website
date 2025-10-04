export default function SituationCard({ situation, selectedOption, setSelectedOption, submitted, handleSubmit }) {
  return (
    <div className="bg-secondary/10 p-5 rounded-lg">
      <div className="mb-4">
        <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm mb-2">
          Round {situation.round}
        </span>
        <h3 className="text-xl font-medium text-secondary">{situation.question}</h3>
      </div>

      {submitted ? (
        <div className="space-y-3">
          <p className="text-secondary font-medium mb-2">Your selection:</p>
          {situation.option.map((opt, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-md border ${
                idx === selectedOption ? "border-primary bg-primary/10 text-primary" : "border-secondary/30 text-secondary/70"
              }`}
            >
              {opt}
              {idx === selectedOption && (
                <span className="ml-2 font-bold">
                  ({situation.weight[idx] > 0 ? "+" : ""}
                  {situation.weight[idx]})
                </span>
              )}
            </div>
          ))}
          <p className="text-center mt-4 text-secondary/70">Waiting for next situation...</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-secondary font-medium mb-2">Select an option:</p>
          {situation.option.map((opt, idx) => (
            <button
              key={idx}
              className={`w-full p-3 text-left rounded-md border ${
                selectedOption === idx
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-secondary/30 hover:border-primary/50 text-secondary"
              }`}
              onClick={() => setSelectedOption(idx)}
            >
              {opt}
            </button>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-primary text-white py-3 rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedOption === null}
          >
            Submit Decision
          </button>
        </div>
      )}
    </div>
  );
}

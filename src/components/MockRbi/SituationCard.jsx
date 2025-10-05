export default function SituationCard({ situation, shuffledOptions, selectedOption, setSelectedOption, submitted, handleSubmit, timeLeft }) {
  const isTimeUp = timeLeft === 0;

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
          {selectedOption === null ? (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md text-center">
              <p className="text-red-500 font-semibold">Time's Up! No answer submitted.</p>
              <p className="text-red-400 text-sm mt-1">0 points awarded</p>
            </div>
          ) : (
            shuffledOptions.map((opt, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-md border ${
                  idx === selectedOption ? "border-primary bg-primary/10 text-primary" : "border-secondary/30 text-secondary/70"
                }`}
              >
                {opt.text}
                {idx === selectedOption && (
                  <span className="ml-2 font-bold">
                    ({opt.weight > 0 ? "+" : ""}
                    {opt.weight})
                  </span>
                )}
              </div>
            ))
          )}
          <p className="text-center mt-4 text-secondary/70">Waiting for next situation...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {isTimeUp ? (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md text-center">
              <p className="text-red-500 font-semibold text-lg">Time's Up!</p>
              <p className="text-red-400 text-sm mt-1">You can no longer submit an answer</p>
            </div>
          ) : (
            <>
              <p className="text-secondary font-medium mb-2">Select an option:</p>
              {shuffledOptions.map((opt, idx) => (
                <button
                  key={idx}
                  className={`w-full p-3 text-left rounded-md border ${
                    selectedOption === idx
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-secondary/30 hover:border-primary/50 text-secondary"
                  }`}
                  onClick={() => setSelectedOption(idx)}
                  disabled={isTimeUp}
                >
                  {opt.text}
                </button>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-primary text-white py-3 rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedOption === null || isTimeUp}
              >
                {isTimeUp ? "Time Expired" : "Submit Decision"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
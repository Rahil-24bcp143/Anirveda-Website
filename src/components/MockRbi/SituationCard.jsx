export default function SituationCard({ situation, shuffledOptions, selectedOption, setSelectedOption, submitted, handleSubmit, timeLeft }) {
  const isTimeUp = timeLeft === 0;

  return (
    <div className="space-y-6">
      {/* Situation Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-full border border-primary/30">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
          </svg>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Round {situation.round}
          </span>
        </div>
        <h3 className="text-xl lg:text-2xl font-semibold text-secondary/95 leading-relaxed">
          {situation.question}
        </h3>
      </div>

      {submitted ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-secondary/80 font-medium text-sm uppercase tracking-wide">Your Selection</p>
          </div>
          
          {selectedOption === null ? (
            <div className="p-6 bg-gradient-to-br from-rose-500/10 to-red-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm text-center space-y-2">
              <svg className="w-12 h-12 mx-auto text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-rose-400 font-semibold text-lg">Time's Up!</p>
              <p className="text-rose-300/80 text-sm">No answer was submitted</p>
              <p className="text-rose-400 font-bold text-xl pt-2">0 points awarded</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {shuffledOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    idx === selectedOption 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/50 shadow-lg" 
                      : "bg-gray-800/20 border-gray-700/30 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${idx === selectedOption ? "text-white font-medium" : "text-secondary/70"}`}>
                      {opt.text}
                    </span>
                    {idx === selectedOption && (
                      <span className={`ml-3 font-bold text-lg px-3 py-1 rounded-lg ${
                        opt.weight > 0 ? "text-emerald-400 bg-emerald-500/10" : 
                        opt.weight < 0 ? "text-rose-400 bg-rose-500/10" : 
                        "text-gray-400 bg-gray-500/10"
                      }`}>
                        {opt.weight > 0 ? "+" : ""}{opt.weight}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="pt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <p className="text-secondary/70 text-sm">Waiting for next situation...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {isTimeUp ? (
            <div className="p-8 bg-gradient-to-br from-rose-500/10 to-red-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm text-center space-y-3">
              <svg className="w-16 h-16 mx-auto text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-rose-400 font-bold text-2xl">Time's Up!</p>
              <p className="text-rose-300/80">You can no longer submit an answer</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-secondary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-secondary/80 font-medium text-sm uppercase tracking-wide">Select Your Answer</p>
              </div>
              
              <div className="space-y-2.5">
                {shuffledOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                      selectedOption === idx
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/50 shadow-lg scale-[1.02]"
                        : "bg-gray-800/30 border-gray-700/30 hover:border-primary/30 hover:bg-gray-800/50"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={() => setSelectedOption(idx)}
                    disabled={isTimeUp}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedOption === idx 
                          ? "border-primary bg-primary" 
                          : "border-gray-600"
                      }`}>
                        {selectedOption === idx && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`flex-1 ${
                        selectedOption === idx ? "text-white font-medium" : "text-secondary/90"
                      }`}>
                        {opt.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  selectedOption === null || isTimeUp
                    ? "bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                }`}
                disabled={selectedOption === null || isTimeUp}
              >
                {isTimeUp ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Time Expired
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Submit Decision
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
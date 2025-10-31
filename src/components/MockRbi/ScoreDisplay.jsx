export default function ScoreDisplay({ score }) {
  return (
    <div className="bg-secondary/10 px-4 py-2 rounded-lg">
      <div className="text-sm text-secondary/70">Score</div>
      <div className="text-2xl font-bold text-primary">{score}</div>
    </div>
  );
}

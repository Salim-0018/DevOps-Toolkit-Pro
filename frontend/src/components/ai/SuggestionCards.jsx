export default function SuggestionCards({ askAI }) {
  const suggestions = [
    "docker build failed",
    "kubectl pod pending",
    "jenkins pipeline failed",
    "prometheus target down",
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => askAI(item)}
          className="rounded-full bg-slate-800 px-4 py-2 text-sm text-cyan-400 hover:bg-slate-700"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

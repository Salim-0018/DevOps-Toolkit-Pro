export default function ResponseCard({ response }) {
  return (
    <div className="mt-8 rounded-2xl bg-slate-800 p-6">
      <h2 className="mb-4 text-2xl font-bold text-cyan-400">
        {response.category.toUpperCase()}
      </h2>

      <ul className="space-y-3">
        {response.steps.map((step, index) => (
          <li
            key={index}
            className="rounded-lg bg-slate-900 p-3 text-white"
          >
            {index + 1}. {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <button className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700">
          🚀 Deploy
        </button>

        <button className="rounded-lg bg-green-600 p-3 text-white hover:bg-green-700">
          🐳 Docker
        </button>

        <button className="rounded-lg bg-purple-600 p-3 text-white hover:bg-purple-700">
          ☸ Kubernetes
        </button>

        <button className="rounded-lg bg-orange-600 p-3 text-white hover:bg-orange-700">
          ⚙ Jenkins
        </button>
      </div>
    </div>
  );
}

export default QuickActions;

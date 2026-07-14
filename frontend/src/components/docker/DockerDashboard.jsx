function DockerDashboard() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Docker Dashboard 🐳
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-blue-100 p-6 shadow">
          <h2 className="text-lg font-semibold">Containers</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-green-100 p-6 shadow">
          <h2 className="text-lg font-semibold">Running</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-red-100 p-6 shadow">
          <h2 className="text-lg font-semibold">Stopped</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-yellow-100 p-6 shadow">
          <h2 className="text-lg font-semibold">Images</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}

export default DockerDashboard;

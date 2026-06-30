function RecentActivity() {
  const activities = [
    "Docker image built successfully",
    "Kubernetes deployment updated",
    "Jenkins pipeline completed",
    "Git repository pushed",
  ];

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Recent Activity
      </h2>

      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="rounded-md border p-3 text-gray-700"
          >
            ✅ {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;

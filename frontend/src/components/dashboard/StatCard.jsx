function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition">
      <div className="mb-3 text-3xl">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-blue-600">
        {value}
      </p>
    </div>
  );
}

export default StatCard;

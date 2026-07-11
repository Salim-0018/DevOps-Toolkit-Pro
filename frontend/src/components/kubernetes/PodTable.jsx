import { useState } from "react";

function PodTable({ pods }) {
  const [search, setSearch] = useState("");


  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Pods
      </h2>

    <div className="mb-4">
  <input
    type="text"
    placeholder="Search Pod..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-lg border p-2"
  />
</div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Pod Name</th>
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Node</th>
          </tr>
        </thead>

        <tbody>
          {pods
  .filter((pod) =>
    pod.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((pod) => (
            <tr key={pod.name} className="border-b">
              <td className="p-2">{pod.name}</td>
              <td className="p-2">{pod.namespace}</td>
              <td className="p-2">
      <span
          className={`rounded-full px-3 py-1 text-sm font-semibold
      ${
        pod.status === "Running"
          ? "bg-green-100 text-green-700"
          : pod.status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
  >
    {pod.status}
  </span>
</td>       
              <td className="p-2">{pod.node}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PodTable;

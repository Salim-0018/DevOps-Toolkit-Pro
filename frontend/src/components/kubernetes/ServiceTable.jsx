import { useState } from "react";

function ServiceTable({ services }) {
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Services
      </h2>

      <input
        type="text"
        placeholder="Search Service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border p-3 dark:bg-slate-800"
      />

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Cluster IP</th>
          </tr>
        </thead>

        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.name} className="border-b">
              <td className="p-2 font-semibold">
                {service.name}
              </td>

              <td className="p-2">
                {service.namespace}
              </td>

              <td className="p-2">
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">
                  {service.type}
                </span>
              </td>

              <td className="p-2">
                {service.clusterIP}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;

import { useState } from "react";

function DeploymentTable({ deployments }) {
  const [search, setSearch] = useState("");

  const filteredDeployments = deployments.filter((deployment) =>
    deployment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Deployments
      </h2>

      <input
        type="text"
        placeholder="Search Deployment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border p-3 dark:bg-slate-800"
      />

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Deployment</th>
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Ready</th>
            <th className="p-2 text-left">Replicas</th>
          </tr>
        </thead>

        <tbody>
          {filteredDeployments.map((deployment) => (
            <tr key={deployment.name} className="border-b">
              <td className="p-2 font-semibold">
                {deployment.name}
              </td>

              <td className="p-2">
                {deployment.namespace}
              </td>
o

              <td className="p-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                  {deployment.ready}
                </span>
              </td>

              <td className="p-2">
                {deployment.replicas}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeploymentTable;

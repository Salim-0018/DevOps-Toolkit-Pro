import { Server } from "lucide-react";

function NodeTable({ nodes }) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <Server className="text-cyan-600" size={28} />
        <h2 className="text-2xl font-bold">
          Kubernetes Nodes
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b text-left">
            <tr>
              <th className="py-3">Name</th>
              <th>Status</th>
              <th>Version</th>
              <th>OS</th>
              <th>Runtime</th>
            </tr>
          </thead>

          <tbody>
            {nodes.map((node) => (
              <tr
                key={node.name}
                className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <td className="py-4 font-semibold">
                  {node.name}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      node.status === "Ready"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {node.status}
                  </span>
                </td>

                <td>{node.version}</td>

                <td>{node.os}</td>

                <td>{node.runtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NodeTable;

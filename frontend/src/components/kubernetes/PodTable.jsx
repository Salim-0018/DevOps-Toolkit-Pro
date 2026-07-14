import { useState } from "react";
import { getPodLogs } from "../../api/kubernetesApi";
import PodLogsModal from "./PodLogsModal";

function PodTable({ pods }) {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const handleLogs = async (namespace, pod) => {
    setLoadingLogs(true);

    try {
      const data = await getPodLogs(namespace, pod);
      setLogs(data.logs || "No Logs Found");
      setShowLogs(true);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch logs");
    }

    setLoadingLogs(false);
  };

  const filteredPods = pods.filter((pod) =>
    pod.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
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
              <th className="p-2 text-left">Logs</th>
            </tr>
          </thead>

          <tbody>
            {filteredPods.map((pod) => (
              <tr key={pod.name} className="border-b">
                <td className="p-2">{pod.name}</td>
                <td className="p-2">{pod.namespace}</td>

                <td className="p-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
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

                <td className="p-2">
                  <button
                    onClick={() => handleLogs(pod.namespace, pod.name)}
                    disabled={loadingLogs}
                    className="rounded-lg bg-cyan-600 px-3 py-1 text-white hover:bg-cyan-700 disabled:opacity-50"
                  >
                    {loadingLogs ? "Loading..." : "Logs"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          {showLogs && (
        <PodLogsModal
          logs={logs}
          onClose={() => setShowLogs(false)}
        />
      )}
    </>
  );
}

export default PodTable;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getContainer,
  getContainerLogs,
  getContainerStats,
} from "../api/dockerApi";

function DockerContainerDetails() {
  const { name } = useParams();

  const [container, setContainer] = useState(null);
  const [logs, setLogs] = useState("");
  const [stats, setStats] = useState(null);
  const loadContainer = async () => {
    try {
      const data = await getContainer(name);
      setContainer(data);
      
      const logData = await getContainerLogs(name);
      setLogs(logData.logs);
     

    } catch (err) {
      console.error(err);
    }
  };
  const loadStats = async () => {
  try {
    const data = await getContainerStats(name);
    setStats(data);
  } catch (err) {
    console.error(err);
  }
}; 
  
  useEffect(() => {
  loadContainer();
  loadStats();

  const interval = setInterval(() => {
    loadStats();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  if (!container) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }


     return (
    <div className="p-8">

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-cyan-100">
        Docker Container
      </p>

      <h1 className="mt-2 text-4xl font-extrabold">
        {container.name}
      </h1>

      <p className="mt-3">
        Image :
        <span className="ml-2 font-semibold">
          {container.image}
        </span>
      </p>

    </div>

    <div>

      {container.running ? (

        <span className="rounded-full bg-green-500 px-5 py-2 font-bold shadow-lg">
          🟢 RUNNING
        </span>

      ) : (

        <span className="rounded-full bg-red-500 px-5 py-2 font-bold shadow-lg">
          🔴 STOPPED
        </span>

      )}

    </div>

  </div>

</div>
{stats && (
  <div className="mb-8 grid gap-6 md:grid-cols-4">

    <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">CPU Usage</p>
      <h2 className="mt-3 text-3xl font-bold">{stats.cpu}</h2>
    </div>

    <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">Memory</p>
      <h2 className="mt-3 text-xl font-bold">{stats.memory}</h2>
    </div>

    <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">Network</p>
      <h2 className="mt-3 text-lg font-bold">{stats.network}</h2>
    </div>

    <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">Block IO</p>
      <h2 className="mt-3 text-lg font-bold">{stats.block_io}</h2>
    </div>

  </div>
)}
<div className="grid gap-6 md:grid-cols-4">

  <div className="rounded-2xl bg-white p-6 shadow-lg">
    <p className="text-gray-500">Status</p>

    <h2 className="mt-2 text-2xl font-bold text-cyan-600">
      {container.status}
    </h2>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-lg">
    <p className="text-gray-500">Platform</p>

    <h2 className="mt-2 text-2xl font-bold">
      {container.platform}
    </h2>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-lg">
    <p className="text-gray-500">
      Restart Count
    </p>

    <h2 className="mt-2 text-2xl font-bold text-orange-500">
      {container.restartCount}
    </h2>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-lg">
    <p className="text-gray-500">
      Running
    </p>

    <h2 className="mt-2 text-2xl font-bold text-green-600">
      {container.running ? "YES" : "NO"}
    </h2>
  </div>

</div>

<div className="mt-8 grid gap-6 md:grid-cols-2">

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <h2 className="mb-4 text-xl font-bold">
      Started At
    </h2>

    <p className="text-slate-600 break-all">
      {container.startedAt}
    </p>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow-lg">

    <h2 className="mb-4 text-xl font-bold">
      Finished At
    </h2>

    <p className="text-slate-600 break-all">
      {container.finishedAt}
    </p>

  </div>

</div>

<div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">

  <h2 className="mb-6 text-2xl font-bold">
    Exposed Ports
  </h2>

  <table className="w-full">

    <thead>

      <tr className="border-b">

        <th className="p-3 text-left">
          Container Port
        </th>

        <th className="p-3 text-left">
          Host Port
        </th>

      </tr>

    </thead>

    <tbody>

      {Object.entries(container.ports || {}).map(([port, value]) => (

        <tr key={port} className="border-b">

          <td className="p-3 font-semibold">
            {port}
          </td>

          <td className="p-3">
            {value?.[0]?.HostPort || "-"}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

<div className="mt-8 rounded-2xl bg-slate-900 shadow-xl">

  <div className="flex items-center justify-between border-b border-slate-700 p-5">

    <h2 className="text-2xl font-bold text-green-400">
      Container Logs
    </h2>

    <button
      onClick={loadContainer}
      className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
    >
      Refresh
    </button>

  </div>

  <pre className="max-h-[500px] overflow-auto bg-black p-6 text-sm text-green-400 whitespace-pre-wrap">
{logs || "No Logs Available"}
  </pre>

</div>



</div>

  );
}

export default DockerContainerDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getJob,
  getBuilds,
  getLastBuild,
  getConsoleLogs,
  triggerBuild,
} from "../api/jenkinsApi";

function JenkinsJobDetails() {
  const { name } = useParams();

  const [job, setJob] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [lastBuild, setLastBuild] = useState(null);
  const [logs, setLogs] = useState("");

  const loadData = async () => {
    try {
      const j = await getJob(name);
      const b = await getBuilds(name);
      const lb = await getLastBuild(name);

      setJob(j);
      setBuilds(b);
      setLastBuild(lb);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [name]);

  const handleLogs = async (build) => {
    const data = await getConsoleLogs(name, build);
    setLogs(data);
  };

  const handleBuild = async () => {
    await triggerBuild(name);
    alert("Build Triggered");
    loadData();
  };

  if (!job) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          {job.displayName}
        </h1>

        <button
          onClick={handleBuild}
          className="rounded-lg bg-cyan-600 px-5 py-3 hover:bg-cyan-500"
        >
          Trigger Build
        </button>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Last Build</h3>
          <p className="mt-3 text-3xl">
            #{lastBuild?.number}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Status</h3>
          <p className="mt-3 text-3xl">
            {lastBuild?.result}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Duration</h3>
          <p className="mt-3 text-3xl">
            {Math.round((lastBuild?.duration || 0) / 1000)} sec
          </p>
        </div>

      </div>

      <div className="mt-10 rounded-xl bg-slate-900 p-6">

        <h2 className="mb-5 text-2xl font-bold">
          Build History
        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th className="p-3 text-left">Build</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Logs</th>

            </tr>

          </thead>

          <tbody>

            {builds.map((build) => (

              <tr
                key={build.number}
                className="border-t border-slate-800"
              >

                <td className="p-3">
                  #{build.number}
                </td>

                <td className="p-3">
                  {build.result}
                </td>

                <td className="p-3">
                  {Math.round(build.duration / 1000)} sec
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      handleLogs(build.number)
                    }
                    className="rounded bg-cyan-600 px-3 py-1"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-10 rounded-xl bg-black p-6">

        <h2 className="mb-4 text-xl font-bold">
          Console Logs
        </h2>

        <pre className="overflow-auto whitespace-pre-wrap text-green-400">
          {logs || "Select a build to view logs"}
        </pre>

      </div>

    </div>
  );
}

export default JenkinsJobDetails;

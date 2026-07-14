import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getHealth,
  getJobs,
  getQueue,
  getNodes,
  triggerBuild,
} from "../api/jenkinsApi";

import JobCard from "../components/jenkins/JobCard";

function Jenkins() {
  const navigate = useNavigate();

  const [health, setHealth] = useState({});
  const [jobs, setJobs] = useState([]);
  const [queue, setQueue] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const [h, j, q, n] = await Promise.all([
        getHealth(),
        getJobs(),
        getQueue(),
        getNodes(),
      ]);

      setHealth(h);
      setJobs(j);
      setQueue(q);
      setNodes(n);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const timer = setInterval(loadData, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleBuild = async (jobName) => {
    try {
      await triggerBuild(jobName);

      alert(`Build Triggered : ${jobName}`);

      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading Jenkins...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Jenkins Dashboard
        </h1>

        <button
          onClick={loadData}
          className="rounded-lg bg-cyan-600 px-5 py-3 hover:bg-cyan-500"
        >
          Refresh
        </button>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-4">

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Total Jobs</h3>
          <p className="mt-3 text-4xl font-bold">{jobs.length}</p>
        </div>

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Queue</h3>
          <p className="mt-3 text-4xl font-bold">{queue.length}</p>
        </div>

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Nodes</h3>
          <p className="mt-3 text-4xl font-bold">{nodes.length}</p>
        </div>

        <div className="rounded-xl bg-slate-900 p-5">
          <h3>Executors</h3>
          <p className="mt-3 text-4xl font-bold">
            {health.numExecutors}
          </p>
        </div>

      </div>

      <div className="mt-8">

        <input
          type="text"
          placeholder="Search Job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-900 p-4 outline-none"
        />

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {filteredJobs.map((job) => (
          <JobCard
            key={job.name}
            job={job}
            onBuild={handleBuild}
            onOpen={(name) =>
              navigate(`/jenkins/job/${name}`)
            }
          />
        ))}

      </div>

    </div>
  );
}

export default Jenkins;

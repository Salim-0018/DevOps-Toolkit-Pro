import { Play, ExternalLink } from "lucide-react";

function JobCard({ job, onBuild, onOpen }) {
  const success = job.color === "blue";

  return (
    <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 hover:border-cyan-500 transition">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {job.name}
          </h2>

          <p
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm ${
              success
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {job.color}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onBuild(job.name)}
            className="rounded-lg bg-cyan-600 p-3 hover:bg-cyan-500"
          >
            <Play size={18}/>
          </button>

          <button
            onClick={() => onOpen(job.name)}
            className="rounded-lg bg-slate-700 p-3 hover:bg-slate-600"
          >
            <ExternalLink size={18}/>
          </button>

        </div>

      </div>

    </div>
  );
}

export default JobCard;

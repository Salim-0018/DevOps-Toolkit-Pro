import {
  Play,
  Square,
  RotateCcw,
  Trash2,
  Cpu,
  MemoryStick,
} from "lucide-react";
import { Link } from "react-router-dom";

function ContainerCard({
  container,
  onStart,
  onStop,
  onRestart,
  onDelete,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="break-all text-2xl font-bold">
            {container.name}
          </h2>

          <p className="mt-1 break-all text-slate-500">
            {container.image}
          </p>
        </div>

        {container.running ? (
          <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
            RUNNING
          </span>
        ) : (
          <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
            STOPPED
          </span>
        )}

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <Cpu
            size={18}
            className="mb-2 text-cyan-600"
          />

          <p className="text-xs text-slate-500">
            Platform
          </p>

          <h3 className="font-bold">
            {container.platform}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <MemoryStick
            size={18}
            className="mb-2 text-indigo-600"
          />

          <p className="text-xs text-slate-500">
            Restart Count
          </p>

          <h3 className="font-bold">
            {container.restartCount}
          </h3>

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() => onStart(container.name)}
          className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          <Play size={16} />
        </button>

        <button
          onClick={() => onStop(container.name)}
          className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <Square size={16} />
        </button>

        <button
          onClick={() => onRestart(container.name)}
          className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={() => onDelete(container.name)}
          className="rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-black"
        >
          <Trash2 size={16} />
        </button>

        <Link
          to={`/docker-container/${container.name}`}
          className="ml-auto rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700"
        >
          Details
        </Link>

      </div>

    </div>
  );
}

export default ContainerCard;

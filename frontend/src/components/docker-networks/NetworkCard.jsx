import {
  Network,
  Globe,
  Trash2,
  Calendar,
  Boxes,
} from "lucide-react";

function NetworkCard({ network, onDelete }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-100 p-4 dark:bg-cyan-900/30">
            <Network
              size={28}
              className="text-cyan-600"
            />
          </div>

          <div>

            <h2 className="break-all text-2xl font-bold">
              {network.name}
            </h2>

            <p className="text-slate-500">
              Docker Network
            </p>

          </div>

        </div>

        <button
          onClick={() => onDelete(network.id)}
          className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>

      <div className="grid gap-4">

        <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <Globe
            size={18}
            className="text-blue-600"
          />

          <div>

            <p className="text-xs text-slate-500">
              Driver
            </p>

            <h3 className="font-bold">
              {network.driver}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <Boxes
            size={18}
            className="text-green-600"
          />

          <div>

            <p className="text-xs text-slate-500">
              Connected Containers
            </p>

            <h3 className="font-bold">
              {network.containers}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <Calendar
            size={18}
            className="text-purple-600"
          />

          <div>

            <p className="text-xs text-slate-500">
              Scope
            </p>

            <h3 className="font-bold">
              {network.scope}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NetworkCard;

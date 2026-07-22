import {
  Database,
  HardDrive,
  Trash2,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";

function VolumeCard({ volume, onDelete }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white">
            <Database size={28} />
          </div>

          <div>
            <h2 className="text-lg font-bold break-all">
              {volume.name}
            </h2>

            <p className="text-sm text-slate-500">
              Driver : {volume.driver}
            </p>
          </div>

        </div>

        <button
          onClick={() => onDelete(volume.name)}
          className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <FolderOpen size={18} className="text-cyan-500" />
          <span className="break-all text-sm">
            {volume.mountpoint}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-green-500" />
          <span className="text-sm">
            Scope : {volume.scope}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <HardDrive size={18} className="text-violet-500" />
          <span className="text-sm">
            Created :
            {" "}
            {new Date(volume.created).toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  );
}

export default VolumeCard;

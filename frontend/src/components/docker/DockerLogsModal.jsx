import {
  X,
  Terminal,
  Copy,
  Download,
} from "lucide-react";

import toast from "react-hot-toast";

function DockerLogsModal({
  open,
  onClose,
  logs,
  containerName,
}) {
  if (!open) return null;

  const copyLogs = () => {
    navigator.clipboard.writeText(logs || "");
    toast.success("Logs copied");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-cyan-500/20 p-3">
              <Terminal className="text-cyan-400" size={28}/>
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Docker Logs
              </h2>

              <p className="text-slate-400">
                {containerName}
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={copyLogs}
              className="rounded-xl bg-cyan-600 p-3 text-white hover:bg-cyan-700"
            >
              <Copy size={18}/>
            </button>

            <button
              className="rounded-xl bg-slate-700 p-3 text-white"
            >
              <Download size={18}/>
            </button>

            <button
              onClick={onClose}
              className="rounded-xl bg-red-600 p-3 text-white"
            >
              <X size={18}/>
            </button>

          </div>

        </div>

        {/* Terminal */}

        <pre className="h-[600px] overflow-auto bg-black p-8 font-mono text-sm leading-7 text-green-400">
{logs || "No logs available"}
        </pre>

      </div>
    </div>
  );
}

export default DockerLogsModal;

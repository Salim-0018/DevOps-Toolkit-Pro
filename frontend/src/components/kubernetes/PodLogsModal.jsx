function PodLogsModal({ logs, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-11/12 max-w-5xl rounded-xl bg-slate-900 p-6">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Pod Logs
          </h2>

          <button
            onClick={onClose}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Close
          </button>
        </div>

        <pre className="h-[500px] overflow-auto rounded bg-black p-4 text-green-400">
{logs}
        </pre>

      </div>
    </div>
  );
}

export default PodLogsModal;

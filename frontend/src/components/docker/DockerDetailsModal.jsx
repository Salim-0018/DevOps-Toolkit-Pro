import { X, Container, Activity } from "lucide-react";

function DockerDetailsModal({
  open,
  onClose,
  container,
}) {
  if (!open || !container) return null;

  const running =
    container.running ||
    container.status?.toLowerCase().includes("up");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-cyan-100 p-4 dark:bg-cyan-900/30">
              <Container
                size={32}
                className="text-cyan-600"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {container.name}
              </h2>

              <p className="text-slate-500">
                {container.image}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-200 p-3 transition hover:bg-red-500 hover:text-white dark:bg-slate-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Status */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border p-5 dark:border-slate-700">

            <p className="mb-2 text-sm text-slate-500">
              Status
            </p>

            <div className="flex items-center gap-3">

              <Activity
                className={
                  running
                    ? "text-green-500"
                    : "text-red-500"
                }
                size={22}
              />

              <span
                className={`font-semibold ${
                  running
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {running ? "Running" : "Stopped"}
              </span>

            </div>

          </div>

          <div className="rounded-2xl border p-5 dark:border-slate-700">

            <p className="mb-2 text-sm text-slate-500">
              Ports
            </p>

            <p className="font-semibold break-all">
              {typeof container.ports === "object"
                ? JSON.stringify(container.ports)
                : container.ports || "No exposed ports"}
            </p>

          </div>

        </div>

        {/* Information */}

        <div className="mt-8 space-y-5">

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Container Name
            </span>

            <span className="font-semibold">
              {container.name}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Container ID
            </span>

            <span className="font-semibold break-all text-right">
              {container.id}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Image
            </span>

            <span className="font-semibold break-all text-right">
              {container.image}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Restart Count
            </span>

            <span className="font-semibold">
              {container.restartCount}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Platform
            </span>

            <span className="font-semibold">
              {container.platform || "Linux"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              IP Address
            </span>

            <span className="font-semibold">
              {container.ip || "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Started At
            </span>

            <span className="font-semibold text-right">
              {container.startedAt
                ? new Date(container.startedAt).toLocaleString()
                : "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3 dark:border-slate-700">
            <span className="font-medium text-slate-500">
              Finished At
            </span>

            <span className="font-semibold text-right">
              {container.finishedAt
                ? new Date(container.finishedAt).toLocaleString()
                : "Still Running"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-slate-500">
              Current State
            </span>

            <span
              className={
                running
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >
              {running ? "Running" : "Stopped"}
            </span>
          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default DockerDetailsModal;

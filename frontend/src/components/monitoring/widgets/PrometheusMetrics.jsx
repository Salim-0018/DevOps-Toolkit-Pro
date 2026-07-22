import { Cpu, Activity, CheckCircle, Boxes } from "lucide-react";

function Metric({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 shadow-lg border border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
}

export default function PrometheusMetrics({ prometheus }) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Prometheus Metrics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Metric
          title="Total Pods"
          value={prometheus?.totalPods ?? 0}
          icon={Boxes}
          color="bg-cyan-600"
        />

        <Metric
          title="Running Pods"
          value={prometheus?.runningPods ?? 0}
          icon={Activity}
          color="bg-green-600"
        />

        <Metric
          title="Node CPU"
          value={`${prometheus?.cpu ?? 0}%`}
          icon={Cpu}
          color="bg-orange-600"
        />

        <Metric
          title="Cluster Status"
          value={prometheus?.status ?? "Loading"}
          icon={CheckCircle}
          color="bg-purple-600"
        />

      </div>
    </div>
  );
}

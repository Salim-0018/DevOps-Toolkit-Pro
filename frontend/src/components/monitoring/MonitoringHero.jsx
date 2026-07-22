import {
  Activity,
  Server,
  Clock3,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

function MonitoringHero({ monitoring }) {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 text-white shadow-2xl">

      <div className="p-10">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">
              Infrastructure Monitoring
            </h1>

            <p className="mt-3 text-cyan-100 text-lg">
              Enterprise DevOps Monitoring Dashboard
            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-8">
            <Activity
              size={70}
              className="text-green-400"
            />
          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <Server className="mb-4 text-cyan-300"/>
            <p className="text-slate-300">Hostname</p>
            <h2 className="text-3xl font-bold">
              {monitoring.hostname}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <Clock3 className="mb-4 text-green-300"/>
            <p className="text-slate-300">Uptime</p>
            <h2 className="text-3xl font-bold">
              {monitoring.uptime}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <MonitorSmartphone className="mb-4 text-cyan-300"/>
            <p className="text-slate-300">Platform</p>
            <h2 className="text-3xl font-bold">
              {monitoring.platform}
            </h2>
          </div>

          <div className="rounded-2xl bg-green-900/50 p-6">
            <ShieldCheck className="mb-4 text-green-400"/>
            <p>Status</p>
            <h2 className="text-3xl font-black">
              {monitoring.status}
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MonitoringHero;

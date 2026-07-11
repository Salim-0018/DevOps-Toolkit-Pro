import {
  ShieldCheck,
  Activity,
  Server,
  Container,
  Boxes,
} from "lucide-react";

function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-10 text-white shadow-2xl">

      {/* Background Blur */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>

      <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}
        <div className="max-w-3xl">

          <div className="mb-6 flex flex-wrap items-center gap-4">

            <div className="rounded-2xl bg-cyan-500/20 p-4 backdrop-blur">
              <ShieldCheck size={34} />
            </div>

            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200">
              Enterprise Edition
            </span>

            <span className="rounded-full bg-emerald-500/20 px-5 py-2 text-sm font-semibold text-emerald-300">
              ● All Systems Operational
            </span>

          </div>

          <h1 className="text-5xl font-black leading-tight">
            DevOps Monitoring
            <br />
            Control Center
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Monitor Docker, Kubernetes, Jenkins, GitHub,
            Linux Servers and your entire infrastructure
            from one modern enterprise dashboard with
            real-time analytics.
          </p>

        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <Server className="mb-4 text-cyan-300" size={34} />
            <h3 className="text-3xl font-bold">12</h3>
            <p className="mt-2 text-slate-300">
              Active Servers
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <Container className="mb-4 text-blue-300" size={34} />
            <h3 className="text-3xl font-bold">28</h3>
            <p className="mt-2 text-slate-300">
              Containers
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <Boxes className="mb-4 text-violet-300" size={34} />
            <h3 className="text-3xl font-bold">8</h3>
            <p className="mt-2 text-slate-300">
              Kubernetes Pods
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <Activity className="mb-4 text-emerald-300" size={34} />
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p className="mt-2 text-slate-300">
              Uptime
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroBanner;

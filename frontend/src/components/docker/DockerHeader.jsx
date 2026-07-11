
import { Container, RefreshCw } from "lucide-react";

function DockerHeader({ total }) {
  return (
    <div className="mb-8">

      <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-3 flex items-center gap-3">

            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
              <Container size={34} />
            </div>

            <div>

              <h1 className="text-4xl font-extrabold">
                Docker Management
              </h1>

              <p className="text-cyan-100">
                Live Container Monitoring & Management
              </p>

            </div>

          </div>

          <p className="mt-4 max-w-2xl text-cyan-100">
            Monitor Docker containers in real time,
            inspect running services,
            restart workloads,
            analyze logs,
            and manage infrastructure from a single dashboard.
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

          <p className="text-sm text-cyan-100">
            Running Containers
          </p>

          <h2 className="mt-2 text-5xl font-extrabold">
            {total}
          </h2>

          <div className="mt-4 flex items-center gap-2">

            <RefreshCw size={16} />

            <span className="text-sm">
              Auto Refresh Every 5 Seconds
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DockerHeader;

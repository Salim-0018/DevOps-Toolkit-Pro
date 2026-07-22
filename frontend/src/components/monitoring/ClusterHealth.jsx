import {
  CheckCircle2,
  Server,
  Boxes,
  ShieldCheck,
} from "lucide-react";

import Card from "../ui/Card";

function ClusterHealth({ monitoring }) {

  return (
    <Card className="p-7">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400">
            System Health
          </p>

          <h2 className="mt-3 text-5xl font-bold text-emerald-400">
            {monitoring.status}
          </h2>

          <p className="mt-3 text-slate-400">
            {monitoring.hostname} • {monitoring.platform}
          </p>

        </div>

        <CheckCircle2
          size={80}
          className="text-emerald-500"
        />

      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-slate-800 p-5">

          <Server
            className="mb-3 text-cyan-400"
          />

          <h3 className="text-3xl font-bold text-white">
            {monitoring.containers}
          </h3>

          <p className="text-slate-400">
            Containers
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 p-5">

          <Boxes
            className="mb-3 text-cyan-400"
          />

          <h3 className="text-3xl font-bold text-white">
            {monitoring.runningContainers}
          </h3>

          <p className="text-slate-400">
            Running
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 p-5">

          <ShieldCheck
            className="mb-3 text-cyan-400"
          />

          <h3 className="text-3xl font-bold text-white">
            {monitoring.images}
          </h3>

          <p className="text-slate-400">
            Docker Images
          </p>

        </div>

      </div>

    </Card>
  );
}

export default ClusterHealth;

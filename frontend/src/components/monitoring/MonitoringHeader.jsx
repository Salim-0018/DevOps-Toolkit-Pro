import {
  Search,
  RefreshCw,
  Download,
  Clock3,
} from "lucide-react";

import Button from "../ui/Button";

function MonitoringHeader() {
  return (
    <div className="mb-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Monitoring Overview
          </h1>

          <p className="mt-2 text-slate-400">
            Real-time infrastructure and application monitoring
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#111827] px-4 py-3">

            <Search
              size={18}
              className="text-slate-500"
            />

            <input
              placeholder="Search anything..."
              className="bg-transparent text-white outline-none placeholder:text-slate-500"
            />

          </div>

          <Button variant="secondary">

            <Clock3 size={18} />

            <span className="ml-2">
              Last 15 Minutes
            </span>

          </Button>

          <Button variant="success">

            <RefreshCw size={18} />

            <span className="ml-2">
              Auto Refresh
            </span>

          </Button>

          <Button>

            <Download size={18} />

            <span className="ml-2">
              Export
            </span>

          </Button>

        </div>

      </div>

    </div>
  );
}

export default MonitoringHeader;

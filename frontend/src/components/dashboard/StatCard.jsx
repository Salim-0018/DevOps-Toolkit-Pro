import {
  Server,
  Container,
  Boxes,
  Settings,
  HardDrive,
  Cpu,
  GitBranch,
  TrendingUp,
} from "lucide-react";

function StatCard({ title, value, type }) {

  const config = {

    servers: {
      icon: <Server className="h-7 w-7 text-blue-500" />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      status: "Online",
    },

    docker: {
      icon: <Container className="h-7 w-7 text-cyan-500" />,
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      status: "Running",
    },

    kubernetes: {
      icon: <Boxes className="h-7 w-7 text-violet-500" />,
      bg: "bg-violet-100 dark:bg-violet-900/30",
      status: "Healthy",
    },

    jenkins: {
      icon: <Settings className="h-7 w-7 text-orange-500" />,
      bg: "bg-orange-100 dark:bg-orange-900/30",
      status: "Active",
    },

    disk: {
      icon: <HardDrive className="h-7 w-7 text-red-500" />,
      bg: "bg-red-100 dark:bg-red-900/30",
      status: "Normal",
    },

    cpu: {
      icon: <Cpu className="h-7 w-7 text-green-500" />,
      bg: "bg-green-100 dark:bg-green-900/30",
      status: "Live",
    },

    github: {
      icon: <GitBranch className="h-7 w-7 text-slate-700 dark:text-white" />,
      bg: "bg-slate-100 dark:bg-slate-800",
      status: "Connected",
    },

  };

  const item =
    config[type] || {
      icon: <Server className="h-7 w-7 text-gray-500" />,
      bg: "bg-gray-100 dark:bg-gray-800",
      status: "Unknown",
    };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"></div>

      <div className="mb-6 flex items-center justify-between">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
        >
          {item.icon}
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
          ● {item.status}
        </span>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {title}
      </h3>

      <h2 className="mt-3 text-4xl font-extrabold text-slate-900 dark:text-white">
        {value}
      </h2>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">

        <div className="flex items-center gap-2 text-green-500">
          <TrendingUp size={16} />

          <span className="text-sm font-medium">
            Stable
          </span>
        </div>

        <span className="text-xs text-slate-500">
          Updated just now
        </span>

      </div>

    </div>
  );
}

export default StatCard;

import {
  LayoutDashboard,
  Server,
  Box,
  Activity,
  Database,
  Cpu,
  Bell,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, name: "Overview" },
  { icon: Server, name: "Nodes" },
  { icon: Box, name: "Pods" },
  { icon: Activity, name: "Deployments" },
  { icon: Database, name: "Services" },
  { icon: Cpu, name: "Metrics" },
  { icon: Bell, name: "Events" },
  { icon: Settings, name: "Settings" },
];

export default function MonitoringSidebar() {
  return (
    <aside className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col">

      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-cyan-400">
          DevOps Toolkit
        </h1>
      </div>

      <div className="flex-1 py-4">

        {menu.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-cyan-500/10 hover:text-cyan-400 transition"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </button>
        ))}

      </div>

      <div className="border-t border-gray-800 p-5 text-xs text-gray-400">
        Kubernetes Cluster
        <div className="text-green-400 mt-2">
          ● Connected
        </div>
      </div>

    </aside>
  );
}

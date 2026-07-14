import {
  LayoutDashboard,
  Container,
  Image,
  Boxes,
  Settings,
  GitBranch,
  Bell,
  UserCircle2,
  ChevronRight,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Docker Containers",
    icon: Container,
    path: "/docker-containers",
  },
  {
    title: "Docker Images",
    icon: Image,
    path: "/docker-images",
  },
  {
    title: "Kubernetes",
    icon: Boxes,
    path: "/kubernetes",
  },
  {
    title: "Jenkins",
    icon: Wrench,
    path: "/jenkins",
  },
  {
    title: "GitHub",
    icon: GitBranch,
    path: "/github",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
];

function Sidebar() {

  return (

    <aside className="hidden lg:flex lg:w-72 lg:flex-col overflow-hidden border-r border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl">
      {/* Logo */}

      <div className="border-b border-slate-800 p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg">
            <ShieldCheck size={30} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide">
              DevOps Toolkit
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Enterprise Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* User */}

      <div className="border-b border-slate-800 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 p-1">
            <UserCircle2 size={46} />
          </div>

          <div>
            <h3 className="font-bold">Salim Khan</h3>

            <p className="text-sm text-emerald-400">
              ● System Online
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-3 p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `group flex w-full items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <div className="flex items-center gap-4">
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </div>

              <ChevronRight
                size={18}
                className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
              />
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">
        <div className="rounded-2xl bg-slate-800/60 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">
                Version
              </p>

              <h3 className="text-lg font-bold">
                v2.0.0
              </h3>
            </div>

            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Enterprise Edition
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

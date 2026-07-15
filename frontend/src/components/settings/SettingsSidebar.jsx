import {
  User,
  Palette,
  LayoutDashboard,
  Bell,
  PlugZap,
  ShieldCheck,
  Info,
} from "lucide-react";

const menus = [
  {
    id: "profile",
    title: "Profile",
    icon: User,
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
  },
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: PlugZap,
  },
  {
    id: "security",
    title: "Security",
    icon: ShieldCheck,
  },
  {
    id: "about",
    title: "About",
    icon: Info,
  },
];

function SettingsSidebar({ active, setActive }) {
  return (
    <aside className="w-full lg:w-72 rounded-3xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Settings
      </h2>

      <div className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.id}
              onClick={() => setActive(menu.id)}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition ${
                active === menu.id
                  ? "bg-cyan-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{menu.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default SettingsSidebar;

import {
  Search,
  Sun,
  Moon,
  Bell,
  User,
} from "lucide-react";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Navbar() {

  const { dark, setDark } = useContext(ThemeContext);

  return (

    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-black text-white">

            DevOps Dashboard

          </h1>

          <p className="mt-1 text-sm text-slate-400">

            Monitor your infrastructure in real time

          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="hidden md:flex items-center rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="ml-3 w-56 bg-transparent text-white outline-none placeholder:text-slate-500"
            />

          </div>

          {/* Theme */}

          <button
            onClick={() => setDark(!dark)}
            className="rounded-2xl bg-slate-800 p-3 text-white transition hover:bg-slate-700"
          >

            {dark ? <Sun size={20} /> : <Moon size={20} />}

          </button>

          {/* Notification */}

          <button className="relative rounded-2xl bg-slate-800 p-3 text-white transition hover:bg-slate-700">

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* Profile */}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-800 px-4 py-2">

            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-white">

              <User size={18} />

            </div>

            <div className="hidden md:block">

              <h3 className="font-semibold text-white">

                Salim Khan

              </h3>

              <p className="text-xs text-slate-400">

                DevOps Engineer

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;

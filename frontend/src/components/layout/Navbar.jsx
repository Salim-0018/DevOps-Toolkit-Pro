import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { dark, setDark } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow
      bg-white text-gray-900
      dark:bg-slate-900 dark:text-white">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-2 rounded-lg px-4 py-2
          bg-gray-100 hover:bg-gray-200
          dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {dark ? "Light" : "Dark"}
        </button>

      </div>
    </header>
  );
}

export default Navbar;

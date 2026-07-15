import { useState } from "react";

function AppearanceSettings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "cyan"
  );

  const saveAppearance = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("accent", accent);

    alert("Appearance Saved Successfully");
  };

  const resetAppearance = () => {
    setTheme("dark");
    setAccent("cyan");

    localStorage.removeItem("theme");
    localStorage.removeItem("accent");

    alert("Appearance Reset");
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-white">
          Appearance
        </h2>

        <p className="text-slate-400">
          Customize your dashboard theme.
        </p>
      </div>

      <div>

        <label className="block mb-2 text-white">
          Theme
        </label>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

      </div>

      <div>

        <label className="block mb-2 text-white">
          Accent Color
        </label>

        <select
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value="cyan">Cyan</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
        </select>

      </div>

      <div className="flex gap-4">

        <button
          onClick={saveAppearance}
          className="rounded-xl bg-cyan-600 px-6 py-3 text-white"
        >
          Save
        </button>

        <button
          onClick={resetAppearance}
          className="rounded-xl bg-red-600 px-6 py-3 text-white"
        >
          Reset
        </button>

      </div>

    </div>
  );
}

export default AppearanceSettings;

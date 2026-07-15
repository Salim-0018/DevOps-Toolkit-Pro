import { useState } from "react";

function DashboardSettings() {

  const [settings, setSettings] = useState({
    autoRefresh:
      JSON.parse(localStorage.getItem("autoRefresh")) ?? true,

    refreshTime:
      localStorage.getItem("refreshTime") || 10,

    showDocker:
      JSON.parse(localStorage.getItem("showDocker")) ?? true,

    showKubernetes:
      JSON.parse(localStorage.getItem("showKubernetes")) ?? true,

    showJenkins:
      JSON.parse(localStorage.getItem("showJenkins")) ?? true,
  });

  const handleCheck = (e) => {

    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });

  };

  const handleInput = (e) => {

    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });

  };

  const saveSettings = () => {

    localStorage.setItem(
      "autoRefresh",
      JSON.stringify(settings.autoRefresh)
    );

    localStorage.setItem(
      "refreshTime",
      settings.refreshTime
    );

    localStorage.setItem(
      "showDocker",
      JSON.stringify(settings.showDocker)
    );

    localStorage.setItem(
      "showKubernetes",
      JSON.stringify(settings.showKubernetes)
    );

    localStorage.setItem(
      "showJenkins",
      JSON.stringify(settings.showJenkins)
    );

    alert("Dashboard Settings Saved");

  };

  const resetSettings = () => {

    localStorage.clear();

    window.location.reload();

  };

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Dashboard Settings
        </h2>

        <p className="text-slate-400">
          Configure dashboard behaviour.
        </p>

      </div>

      <div className="rounded-xl bg-slate-900 p-6 space-y-6">

        <label className="flex items-center justify-between">

          <span className="text-white">
            Auto Refresh
          </span>

          <input
            type="checkbox"
            name="autoRefresh"
            checked={settings.autoRefresh}
            onChange={handleCheck}
          />

        </label>

        <label className="block">

          <span className="text-white">
            Refresh Interval (Seconds)
          </span>

          <input
            type="number"
            min="5"
            max="120"
            name="refreshTime"
            value={settings.refreshTime}
            onChange={handleInput}
            className="mt-2 w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-white">
            Show Docker Widget
          </span>

          <input
            type="checkbox"
            name="showDocker"
            checked={settings.showDocker}
            onChange={handleCheck}
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-white">
            Show Kubernetes Widget
          </span>

          <input
            type="checkbox"
            name="showKubernetes"
            checked={settings.showKubernetes}
            onChange={handleCheck}
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-white">
            Show Jenkins Widget
          </span>

          <input
            type="checkbox"
            name="showJenkins"
            checked={settings.showJenkins}
            onChange={handleCheck}
          />

        </label>

        <div className="flex gap-4">

          <button
            onClick={saveSettings}
            className="rounded-xl bg-cyan-600 px-6 py-3 text-white"
          >
            Save
          </button>

          <button
            onClick={resetSettings}
            className="rounded-xl bg-red-600 px-6 py-3 text-white"
          >
            Reset
          </button>

        </div>

      </div>

    </div>

  );

}

export default DashboardSettings;

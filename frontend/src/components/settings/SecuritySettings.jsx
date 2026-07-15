import { useState } from "react";

function SecuritySettings() {

  const [security, setSecurity] = useState({
    twoFactor:
      JSON.parse(localStorage.getItem("twoFactor")) ?? false,

    loginAlert:
      JSON.parse(localStorage.getItem("loginAlert")) ?? true,

    autoLogout:
      localStorage.getItem("autoLogout") || 30,
  });

  const handleCheck = (e) => {

    setSecurity({
      ...security,
      [e.target.name]: e.target.checked,
    });

  };

  const handleInput = (e) => {

    setSecurity({
      ...security,
      [e.target.name]: e.target.value,
    });

  };

  const saveSecurity = () => {

    localStorage.setItem(
      "twoFactor",
      JSON.stringify(security.twoFactor)
    );

    localStorage.setItem(
      "loginAlert",
      JSON.stringify(security.loginAlert)
    );

    localStorage.setItem(
      "autoLogout",
      security.autoLogout
    );

    alert("Security Settings Saved");

  };

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Security Settings
        </h2>

        <p className="text-slate-400">
          Configure account security options.
        </p>

      </div>

      <div className="rounded-xl bg-slate-900 p-6 space-y-6">

        <label className="flex justify-between text-white">

          Enable Two Factor Authentication

          <input
            type="checkbox"
            name="twoFactor"
            checked={security.twoFactor}
            onChange={handleCheck}
          />

        </label>

        <label className="flex justify-between text-white">

          Login Alerts

          <input
            type="checkbox"
            name="loginAlert"
            checked={security.loginAlert}
            onChange={handleCheck}
          />

        </label>

        <div>

          <label className="block text-white mb-2">
            Auto Logout (Minutes)
          </label>

          <input
            type="number"
            min="5"
            max="120"
            name="autoLogout"
            value={security.autoLogout}
            onChange={handleInput}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>

        <button
          onClick={saveSecurity}
          className="rounded-xl bg-cyan-600 px-6 py-3 text-white"
        >
          Save Security
        </button>

      </div>

    </div>

  );

}

export default SecuritySettings;

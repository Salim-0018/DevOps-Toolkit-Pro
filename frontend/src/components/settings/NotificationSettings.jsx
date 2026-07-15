import { useState } from "react";

function NotificationSettings() {

  const [notifications, setNotifications] = useState({
    email:
      JSON.parse(localStorage.getItem("notify_email")) ?? true,

    desktop:
      JSON.parse(localStorage.getItem("notify_desktop")) ?? true,

    build:
      JSON.parse(localStorage.getItem("notify_build")) ?? true,

    monitoring:
      JSON.parse(localStorage.getItem("notify_monitoring")) ?? true,
  });

  const handleChange = (e) => {

    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });

  };

  const saveNotifications = () => {

    localStorage.setItem(
      "notify_email",
      JSON.stringify(notifications.email)
    );

    localStorage.setItem(
      "notify_desktop",
      JSON.stringify(notifications.desktop)
    );

    localStorage.setItem(
      "notify_build",
      JSON.stringify(notifications.build)
    );

    localStorage.setItem(
      "notify_monitoring",
      JSON.stringify(notifications.monitoring)
    );

    alert("Notification Settings Saved");

  };

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Notification Settings
        </h2>

        <p className="text-slate-400">
          Configure alerts and notifications.
        </p>

      </div>

      <div className="rounded-xl bg-slate-900 p-6 space-y-5">

        <label className="flex justify-between text-white">
          Email Notifications
          <input
            type="checkbox"
            name="email"
            checked={notifications.email}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between text-white">
          Desktop Notifications
          <input
            type="checkbox"
            name="desktop"
            checked={notifications.desktop}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between text-white">
          Jenkins Build Alerts
          <input
            type="checkbox"
            name="build"
            checked={notifications.build}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between text-white">
          Monitoring Alerts
          <input
            type="checkbox"
            name="monitoring"
            checked={notifications.monitoring}
            onChange={handleChange}
          />
        </label>

        <button
          onClick={saveNotifications}
          className="rounded-xl bg-cyan-600 px-6 py-3 text-white"
        >
          Save Notifications
        </button>

      </div>

    </div>

  );

}

export default NotificationSettings;

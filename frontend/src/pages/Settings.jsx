import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import SettingsSidebar from "../components/settings/SettingsSidebar";

import ProfileSettings from "../components/settings/ProfileSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import DashboardSettings from "../components/settings/DashboardSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import IntegrationSettings from "../components/settings/IntegrationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import AboutSettings from "../components/settings/AboutSettings";

function Settings() {
  const [active, setActive] = useState("profile");

  const renderContent = () => {
    switch (active) {
      case "profile":
        return <ProfileSettings />;

      case "appearance":
        return <AppearanceSettings />;

      case "dashboard":
        return <DashboardSettings />;

      case "notifications":
        return <NotificationSettings />;

      case "integrations":
        return <IntegrationSettings />;

      case "security":
        return <SecuritySettings />;

      case "about":
        return <AboutSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Configure DevOps Toolkit Pro according to your
            preferences.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          <SettingsSidebar
            active={active}
            setActive={setActive}
          />

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            {renderContent()}

            <div className="mt-10 flex justify-end gap-4 border-t border-slate-800 pt-6">

              <button
                className="rounded-xl border border-red-500 px-6 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Reset Defaults
              </button>

              <button
                className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;

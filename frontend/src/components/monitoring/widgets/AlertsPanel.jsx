import {
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AlertsPanel({ alerts }) {
const displayAlerts =
  alerts && alerts.length > 0
    ? alerts.map((a) => ({
        title: a.level.toUpperCase(),
        value: a.message,
        color:
          a.level === "critical"
            ? "text-red-400"
            : "text-yellow-400",
        icon:
          a.level === "critical"
            ? XCircle
            : AlertTriangle,
      }))
    : [
        {
          title: "SYSTEM HEALTHY",
          value: "No Alerts",
          color: "text-green-400",
          icon: CheckCircle,
        },
      ];
  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Live Alerts
      </h2>

      <div className="space-y-4">

        {displayAlerts.map((alert, index) => {

          const Icon = alert.icon;

          return (

            <div
              key={index}
              className="flex items-center justify-between rounded-2xl bg-slate-800 p-4 border border-slate-700"
            >

              <div className="flex items-center gap-4">

                <Icon className={alert.color} size={24} />

                <div>

                  <p className="font-semibold text-white">
                    {alert.title}
                  </p>

                  <p className={alert.color}>
                    {alert.value}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

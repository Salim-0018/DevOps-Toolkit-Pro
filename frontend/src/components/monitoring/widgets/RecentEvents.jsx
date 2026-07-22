import {
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

function RecentEvents() {

  const events = [
    {
      time: "10 sec ago",
      text: "Docker Engine Healthy",
      icon: <CheckCircle2 className="text-green-400" size={18} />,
    },
    {
      time: "35 sec ago",
      text: "Container nginx restarted",
      icon: <Clock3 className="text-cyan-400" size={18} />,
    },
    {
      time: "2 min ago",
      text: "CPU usage crossed 70%",
      icon: <AlertTriangle className="text-yellow-400" size={18} />,
    },
    {
      time: "5 min ago",
      text: "Kubernetes Cluster Connected",
      icon: <CheckCircle2 className="text-green-400" size={18} />,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {events.map((event, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
          >
            <div className="flex items-center gap-3">
              {event.icon}

              <div>
                <p className="text-white">
                  {event.text}
                </p>

                <p className="text-sm text-slate-400">
                  {event.time}
                </p>
              </div>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentEvents;

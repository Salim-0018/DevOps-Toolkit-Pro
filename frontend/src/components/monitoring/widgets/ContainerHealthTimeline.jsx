import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

function ContainerHealthTimeline() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const status = ["Healthy", "Running", "Restarted", "Stopped"];

    const timer = setInterval(() => {
      const item = {
        id: Date.now(),
        container: `container-${Math.floor(Math.random() * 10) + 1}`,
        status: status[Math.floor(Math.random() * status.length)],
        time: new Date().toLocaleTimeString(),
      };

      setHistory((prev) => [item, ...prev].slice(0, 10));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Container Health Timeline
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
          >
            <div className="flex items-center gap-3">
              <Activity className="text-green-400" />
              <div>
                <p className="font-semibold text-white">
                  {item.container}
                </p>
                <p className="text-sm text-slate-400">
                  {item.status}
                </p>
              </div>
            </div>

            <span className="text-sm text-slate-500">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContainerHealthTimeline;

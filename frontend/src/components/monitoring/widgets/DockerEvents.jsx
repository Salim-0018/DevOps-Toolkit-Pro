import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function DockerEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    const source = new EventSource(
      "http://localhost:5000/api/monitoring/docker-stream"
    );

    source.onmessage = (event) => {

      setEvents((prev) => [
        {
          action: event.data,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0,20));

    };

    source.onerror = () => {
      source.close();
    };

    return () => source.close();

  }, []);

  return (

    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Live Docker Events
      </h2>

      <div className="space-y-3">

        {events.map((item,index)=>(

          <div
            key={index}
            className="flex justify-between bg-slate-800 rounded-xl p-4"
          >

            <div className="flex gap-3">

              <Activity className="text-cyan-400"/>

              <span className="text-white break-all">
                {item.action}
              </span>

            </div>

            <span className="text-slate-400 text-sm">
              {item.time}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

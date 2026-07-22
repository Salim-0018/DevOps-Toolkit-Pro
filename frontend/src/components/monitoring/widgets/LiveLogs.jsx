import { Terminal } from "lucide-react";

export default function LiveLogs({ logs }) {

  if (!logs || logs.length === 0) {

  return (

    <div className="rounded-3xl bg-black p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-green-400">
        Live Logs
      </h2>

      <div className="mt-6 text-center text-slate-400">
        No Logs Available
      </div>

    </div>

  );

}

  return (

    <div className="rounded-3xl bg-black p-6 shadow-xl">

      <div className="mb-5 flex items-center gap-3">

        <Terminal className="text-green-400"/>

        <h2 className="text-2xl font-bold text-green-400">
          Live Logs
        </h2>

      </div>

      <div className="h-80 overflow-y-auto rounded-xl bg-slate-950 p-4 font-mono text-sm">

        {logs.map((log,index)=>(

          <p
            key={index}
            className="mb-2 text-green-400"
          >
            {String(log).replace(/\u001b\[[0-9;]*m/g, "")}
          </p>

        ))}

      </div>

    </div>

  );

}

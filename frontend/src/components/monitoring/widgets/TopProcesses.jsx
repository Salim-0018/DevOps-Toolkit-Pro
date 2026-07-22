import { Cpu } from "lucide-react";

export default function TopProcesses({ processes }) {

  if (!processes || processes.length === 0) {

  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-center text-white">
      Loading Processes...
    </div>
  );

}

  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <div className="mb-6 flex items-center gap-3">
        <Cpu className="text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">
          Top Processes
        </h2>
      </div>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-700 text-slate-400">

            <th className="py-3 text-left">PID</th>
            <th className="text-left">PROCESS</th>
            <th className="text-left">CPU</th>
            <th className="text-left">MEM</th>

          </tr>

        </thead>

        <tbody>

          {processes.map((p) => (

            <tr
              key={p.pid}
              className="border-b border-slate-800 hover:bg-slate-800"
            >

              <td className="py-4 text-white">{p.pid}</td>

              <td className="text-cyan-400">{p.name}</td>

              <td className="text-green-400">
                 {p.cpu}%
                </td>

              <td className="text-orange-400">
                 {p.memory}%
                </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

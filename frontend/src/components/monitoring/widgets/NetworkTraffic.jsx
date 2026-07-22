import {
  Wifi,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { useEffect, useState } from "react";

function NetworkTraffic({ network }) {

  if (!network) {

  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-center text-white">
      Loading Network...
    </div>
  );

}

  return (

    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <div className="mb-6 flex items-center gap-3">

        <Wifi className="text-cyan-400" size={28} />

        <h2 className="text-2xl font-bold text-white">
          Live Network Traffic
        </h2>

      </div>

      <div className="grid grid-cols-3 gap-5">

        <div className="rounded-2xl bg-slate-800 p-5">

          <div className="mb-3 flex items-center gap-2">

            <ArrowUp className="text-green-400" />

            <span className="text-slate-400">
              Upload
            </span>

          </div>

          <h2 className="text-4xl font-bold text-green-400">
            {network.tx_sec ?? 0}
          </h2>

          <p className="mt-2 text-slate-500">
            Bytes/s
          </p>

        </div>

        <div className="rounded-2xl bg-slate-800 p-5">

          <div className="mb-3 flex items-center gap-2">

            <ArrowDown className="text-cyan-400" />

            <span className="text-slate-400">
              Download
            </span>

          </div>

          <h2 className="text-4xl font-bold text-cyan-400">
            {network.rx_sec ?? 0}
          </h2>

          <p className="mt-2 text-slate-500">
            Bytes/s
          </p>

        </div>

        <div className="rounded-2xl bg-slate-800 p-5">

          <div className="mb-3 flex items-center gap-2">

            <Wifi className="text-purple-400" />

            <span className="text-slate-400">
              Packets
            </span>

          </div>

          <h2 className="text-4xl font-bold text-purple-400">
            {network.rx}
          </h2>

          <p className="mt-2 text-slate-500">
            Received
          </p>

        </div>

      </div>

    </div>

  );

}

export default NetworkTraffic;

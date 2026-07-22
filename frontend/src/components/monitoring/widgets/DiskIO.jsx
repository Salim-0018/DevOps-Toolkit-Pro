import {
  HardDrive,
  Upload,
  Download,
} from "lucide-react";

import { useEffect, useState } from "react";

function DiskIO({ disk }) {

  if (!disk) {

  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-center text-white">
      Loading Disk I/O...
    </div>
  );

}

  return (

    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <div className="mb-6 flex items-center gap-3">

        <HardDrive
          className="text-orange-400"
          size={28}
        />

        <h2 className="text-2xl font-bold text-white">
          Live Disk I/O
        </h2>

      </div>

      <div className="grid grid-cols-3 gap-5">

        <div className="rounded-2xl bg-slate-800 p-5">

          <div className="mb-2 flex items-center gap-2">

            <Download className="text-cyan-400"/>

            <span className="text-slate-400">
              Read
            </span>

          </div>

          <h2 className="text-4xl font-bold text-cyan-400">
            {disk.read}
          </h2>

          <p className="mt-2 text-slate-500">
            Bytes/s
          </p>

        </div>

        <div className="rounded-2xl bg-slate-800 p-5">

          <div className="mb-2 flex items-center gap-2">

            <Upload className="text-green-400"/>

            <span className="text-slate-400">
              Write
            </span>

          </div>

          <h2 className="text-4xl font-bold text-green-400">
            {disk.write}
          </h2>

          <p className="mt-2 text-slate-500">
            Bytes/s
          </p>

        </div>

        <div className="rounded-2xl bg-slate-800 p-5">

          <div className="mb-2 flex items-center gap-2">

            <HardDrive className="text-orange-400"/>

            <span className="text-slate-400">
              I/O Load
            </span>

          </div>

          <h2 className="text-4xl font-bold text-orange-400">
            {disk.read + disk.write}
          </h2>

          <p className="mt-2 text-slate-500">
            Total I/O
          </p>

        </div>

      </div>

    </div>

  );

}

export default DiskIO;

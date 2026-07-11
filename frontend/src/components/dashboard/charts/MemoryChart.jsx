import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { MemoryStick } from "lucide-react";
import { getMemoryData } from "../../../api/dashboardApi";

function MemoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getMemoryData());

    const interval = setInterval(() => {
      setData(getMemoryData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const latest =
    data.length > 0 ? data[data.length - 1].usage : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 p-4 text-white">

            <MemoryStick size={28} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Memory Usage
            </h2>

            <p className="text-sm text-slate-500">
              Live RAM Performance
            </p>

          </div>

        </div>

        <div className="text-right">

          <h3 className="text-3xl font-black text-violet-600">
            {latest}%
          </h3>

          <span className="text-xs text-emerald-500">
            ● Live
          </span>

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height={280}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#334155"
            opacity={0.2}
          />

          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="usage"
            stroke="#a855f7"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 6,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MemoryChart;

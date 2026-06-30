import { useEffect, useState } from "react";
import { getCpuData } from "../../../api/dashboardApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CpuChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // initial load
    setData(getCpuData());

    // live update every 3 sec
    const interval = setInterval(() => {
      setData(getCpuData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        CPU Usage (Live)
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="usage" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CpuChart;

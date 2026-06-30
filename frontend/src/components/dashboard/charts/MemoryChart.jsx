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

function generateData() {
  return [
    { time: "10:00", usage: Math.floor(Math.random() * 100) },
    { time: "10:10", usage: Math.floor(Math.random() * 100) },
    { time: "10:20", usage: Math.floor(Math.random() * 100) },
    { time: "10:30", usage: Math.floor(Math.random() * 100) },
    { time: "10:40", usage: Math.floor(Math.random() * 100) },
  ];
}

function CpuChart() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
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

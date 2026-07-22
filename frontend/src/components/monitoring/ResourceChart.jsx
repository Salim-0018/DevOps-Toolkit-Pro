import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { getMonitoring } from "../../api/monitoringApi";

function ResourceChart({ title }) {

  const [history, setHistory] = useState([]);

  const loadData = async () => {
    try {
      const data = await getMonitoring();

      const value =
        title === "CPU Usage"
          ? data.cpu
          : data.memory;

      setHistory((prev) => {
        const updated = [...prev, value];
        return updated.slice(-12);
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    loadData();

    const timer = setInterval(loadData, 5000);

    return () => clearInterval(timer);

  }, []);

  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        {title}
      </h2>

      <div className="flex h-72 items-end gap-2">

        {history.map((value, index) => (

          <div
            key={index}
            className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-600 to-blue-400 transition-all duration-500"
            style={{
              height: `${value}%`,
            }}
          />

        ))}

      </div>

    </Card>
  );
}

export default ResourceChart;

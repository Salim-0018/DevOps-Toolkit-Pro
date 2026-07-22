import {
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getMonitoring } from "../../api/monitoringApi";

import MetricCard from "./MetricCard";

function MetricsGrid() {

  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const res = await getMonitoring();
      setData(res);
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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <MetricCard
        title="CPU Usage"
        value={`${data?.cpu ?? 0}%`}
        subtitle="Live"
        icon={<Cpu size={30} />}
      />

      <MetricCard
        title="Memory"
        value={`${data?.memory ?? 0}%`}
        subtitle="Live"
        icon={<MemoryStick size={30} />}
      />

      <MetricCard
        title="Disk"
        value={data?.disk ?? "0%"}
        subtitle="Live"
        icon={<HardDrive size={30} />}
      />

      <MetricCard
        title="Network"
        value={data?.status ?? "Unknown"}
        subtitle={data?.hostname ?? "-"}
        icon={<Activity size={30} />}
      />

    </div>
  );
}

export default MetricsGrid;

import { useEffect, useState } from "react";
import MemoryChart from "../components/dashboard/charts/MemoryChart";
import CpuChart from "../components/dashboard/charts/CpuChart";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    servers: 0,
    docker: 0,
    kubernetes: 0,
    jenkins: 0,
    disk: "0%",
  });

useEffect(() => {
  fetch("http://127.0.0.1:8000/dashboard")
    .then((response) => response.json())
    .then((data) => {
      setDashboardData(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);


  return (
    <DashboardLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        DevOps Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
       <StatCard
  title="Disk Usage"
  value={dashboardData.disk}
  type="disk"
/>

<StatCard
  title="Servers"
  value={dashboardData.servers}
  type="servers"
/>

<StatCard
  title="Docker Containers"
  value={dashboardData.docker}
  type="docker"
/>

<StatCard
  title="Kubernetes Clusters"
  value={dashboardData.kubernetes}
  type="kubernetes"
/>

<StatCard
  title="Jenkins Jobs"
  value={dashboardData.jenkins}
  type="jenkins"
/>
      </div>

      <QuickActions />
      <RecentActivity />
        <CpuChart />
      <MemoryChart />
    </DashboardLayout>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import HeroBanner from "../components/dashboard/HeroBanner";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

import CpuChart from "../components/dashboard/charts/CpuChart";
import MemoryChart from "../components/dashboard/charts/MemoryChart";

import DockerTable from "../components/docker/DockerTable";

function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    servers: 0,
    docker: 0,
    kubernetes: 0,
    jenkins: 0,
    cpu: 0,
    memory: 0,
    disk: "0%",
    network: "Healthy",
  });

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const res = await fetch("/api/dashboard");

        const data = await res.json();

        setDashboardData(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadDashboard();

    const interval = setInterval(loadDashboard, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <DashboardLayout>

      <HeroBanner />

      {/* ========================= */}
      {/* Enterprise Stat Cards */}
      {/* ========================= */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-8">
     
    
            <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="Servers"
              value={dashboardData.servers}
              type="servers"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="Docker"
              value={dashboardData.docker}
              type="docker"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="Kubernetes"
              value={dashboardData.kubernetes}
              type="kubernetes"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="Jenkins"
              value={dashboardData.jenkins}
              type="jenkins"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="Disk Usage"
              value={dashboardData.disk}
              type="disk"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="CPU Usage"
              value={`${dashboardData.cpu}%`}
              type="cpu"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="Memory Usage"
              value={`${dashboardData.memory}%`}
              type="cpu"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 p-[2px] shadow-xl">
          <div className="rounded-[22px] bg-white p-2 dark:bg-slate-900">
            <StatCard
              title="GitHub"
              value="Connected"
              type="github"
            />
          </div>
        </div>

      </div>

      {/* ========================= */}
      {/* System Health */}
      {/* ========================= */}

      <section className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Infrastructure Health
            </h2>

            <p className="mt-2 text-slate-300">
              Live monitoring of your DevOps environment
            </p>
          </div>

          <div className="rounded-full bg-emerald-500/20 px-5 py-2 text-emerald-400">
            ● Healthy
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {/* Memory */}

          <div>

            <div className="mb-2 flex justify-between">
              <span>Memory</span>
              <span>{dashboardData.memory}%</span>
            </div>

            <div className="h-4 rounded-full bg-slate-700">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{
                  width: `${dashboardData.memory}%`,
                }}
              />
            </div>

          </div>

          {/* CPU */}

          <div>

            <div className="mb-2 flex justify-between">
              <span>CPU</span>
              <span>{dashboardData.cpu}%</span>
            </div>

            <div className="h-4 rounded-full bg-slate-700">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-700"
                style={{
                  width: `${dashboardData.cpu}%`,
                }}
              />
            </div>

          </div>

          {/* Disk */}

          <div>

            <div className="mb-2 flex justify-between">
              <span>Disk</span>
              <span>{dashboardData.disk}</span>
            </div>

            <div className="h-4 rounded-full bg-slate-700">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-700"
                style={{
                  width: dashboardData.disk,
                }}
              />
            </div>

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* Charts */}
      {/* ========================= */}

      <section className="mt-10 grid gap-6 xl:grid-cols-2">

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-2 shadow-lg">
          <CpuChart />
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 p-2 shadow-lg">
          <MemoryChart />
        </div>

      </section>

      {/* ========================= */}
      {/* Quick Actions & Recent Activity */}
      {/* ========================= */}

      <section className="mt-10 grid gap-6 xl:grid-cols-2">

        <div className="rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-2 shadow-lg">
          <QuickActions />
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 p-2 shadow-lg">
          <RecentActivity />
        </div>

      </section>

      {/* ========================= */}
      {/* Docker Containers */}
      {/* ========================= */}

      <section className="mt-10">
        <DockerTable />
      </section>

    </DashboardLayout>

  );
}

export default Dashboard;

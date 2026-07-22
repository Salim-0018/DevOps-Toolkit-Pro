import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import MonitoringHero from "../components/monitoring/MonitoringHero";
import MonitoringOverview from "../components/monitoring/MonitoringOverview";
import MonitoringCharts from "../components/monitoring/MonitoringCharts";
import SystemStatus from "../components/monitoring/widgets/SystemStatus";
import RecentEvents from "../components/monitoring/widgets/RecentEvents";
import ContainerStatusTable from "../components/monitoring/widgets/ContainerStatusTable";
import NetworkTraffic from "../components/monitoring/widgets/NetworkTraffic";
import DiskIO from "../components/monitoring/widgets/DiskIO";
import DockerEvents from "../components/monitoring/widgets/DockerEvents";
import ContainerHealthTimeline from "../components/monitoring/widgets/ContainerHealthTimeline";
import PrometheusMetrics from "../components/monitoring/widgets/PrometheusMetrics";
import TopProcesses from "../components/monitoring/widgets/TopProcesses";
import AlertsPanel from "../components/monitoring/widgets/AlertsPanel";
import LiveLogs from "../components/monitoring/widgets/LiveLogs";

function Monitoring() {

  const [monitoring, setMonitoring] = useState({
    cpu: 0,
    memory: 0,
    disk: "0%",
    status: "Loading...",
    hostname: "",
    platform: "",
    containers: 0,
    runningContainers: 0,
    images: 0,
    networks: 0,
    volumes: 0,
    uptime: "",
  });

const [system, setSystem] = useState(null);


const [prometheus, setPrometheus] = useState({
  totalPods: 0,
  runningPods: 0,
  cpu: 0,
  status: "Loading...",
});

const [docker, setDocker] = useState(null);

const [network, setNetwork] = useState(null);

const [disk, setDisk] = useState(null);

const [processes, setProcesses] = useState([]);

const [logs, setLogs] = useState([]);

const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const loadMonitoring = async () => {

      try {

        const res = await fetch("/api/monitoring");

        const data = await res.json();

        setMonitoring(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadMonitoring();

    const interval = setInterval(loadMonitoring, 3000);

    return () => clearInterval(interval);

  }, []);

useEffect(() => {

  const loadSystem = async () => {

    try {

      const res = await fetch("/api/monitoring/system");

      const data = await res.json();

      setSystem(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadSystem();

  const interval = setInterval(loadSystem, 3000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const loadDocker = async () => {

    try {

      const res = await fetch("/api/monitoring/docker");

      const data = await res.json();

      setDocker(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadDocker();

  const interval = setInterval(loadDocker, 3000);

  return () => clearInterval(interval);

}, []);


useEffect(() => {

  const loadNetwork = async () => {

    try {

      const res = await fetch("/api/monitoring/network");

      const data = await res.json();

      setNetwork(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadNetwork();

  const interval = setInterval(loadNetwork, 2000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const loadDisk = async () => {

    try {

      const res = await fetch("/api/monitoring/disk");

      const data = await res.json();

      setDisk(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadDisk();

  const interval = setInterval(loadDisk, 2000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const loadProcesses = async () => {

    try {

      const res = await fetch("/api/monitoring/processes");

      const data = await res.json();

      setProcesses(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadProcesses();

  const interval = setInterval(loadProcesses, 3000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const loadLogs = async () => {

    try {

      const res = await fetch("/api/monitoring/logs");

      const data = await res.json();

      setLogs(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadLogs();

  const interval = setInterval(loadLogs, 3000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const loadAlerts = async () => {

    try {

      const res = await fetch("/api/monitoring/alerts");

      const data = await res.json();

      setAlerts(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadAlerts();

  const interval = setInterval(loadAlerts, 3000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const loadPrometheus = async () => {

    try {

      const res = await fetch("/api/prometheus/metrics");

      const data = await res.json();

      setPrometheus(data);

    } catch (err) {

      console.error(err);

    }

  };

  loadPrometheus();

  const interval = setInterval(loadPrometheus, 3000);

  return () => clearInterval(interval);

}, []);

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <MonitoringHero monitoring={monitoring} />

        <SystemStatus
         system={system}
         docker={docker}
         monitoring={monitoring}
        />

        <MonitoringCharts monitoring={monitoring} />

        <PrometheusMetrics prometheus={prometheus} />
                
        <NetworkTraffic network={network} />
       
        <DiskIO disk={disk} />

        <DockerEvents />

        <ContainerHealthTimeline />


        <div className="grid gap-6 xl:grid-cols-2">

           <RecentEvents />

           <ContainerStatusTable />
         
           <TopProcesses processes={processes} />

           <AlertsPanel alerts={alerts} />

           <LiveLogs logs={logs} />

        </div>

        <MonitoringOverview monitoring={monitoring} />

      </div>

    </DashboardLayout>

  );

}

export default Monitoring;

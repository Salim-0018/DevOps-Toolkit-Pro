import { useEffect, useState } from "react";
import {
  getCluster,
  getNodes,
  getPods,
  getDeployments,
  getServices,
  getNamespaces,
} from "../../api/kubernetesApi";

import ClusterCards from "./ClusterCards";
import NodeTable from "./NodeTable";
import PodTable from "./PodTable";
import DeploymentTable from "./DeploymentTable";
import ServiceTable from "./ServiceTable";
import NamespaceTable from "./NamespaceTable";

function KubernetesDashboard() {
  const [cluster, setCluster] = useState({});
  const [nodes, setNodes] = useState([]);
  const [pods, setPods] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [services, setServices] = useState([]);
  const [namespaces, setNamespaces] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");


  const loadData = async () => {

     setLoading(true);
     setError("");

    try {
      const [
        clusterData,
        nodesData,
        podsData,
        deploymentsData,
        servicesData,
        namespacesData,
      ] = await Promise.all([
        getCluster(),
        getNodes(),
        getPods(),
        getDeployments(),
        getServices(),
        getNamespaces(),
      ]);

      setCluster(clusterData);
      setNodes(nodesData);
      setPods(podsData);
      setDeployments(deploymentsData);
      setServices(servicesData);
      setNamespaces(namespacesData);
      setLastUpdated(new Date().toLocaleTimeString());     

    } catch (err) {
      console.error(err);
      setError("Failed to load Kubernetes data");
 
    } finally {
      setLoading(false);
    }

};

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        {error}
      </h2>
    </div>
  );
}

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
  <h2 className="text-2xl font-bold">
    Kubernetes Connected ✅
  </h2>

  <button
    onClick={loadData}
    className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
  >
    Refresh
  </button>
</div>

<p className="mb-6 text-sm text-slate-500">
  Last Updated: {lastUpdated}
</p>

      <ClusterCards
        cluster={cluster}
        nodes={nodes}
        pods={pods}
        deployments={deployments}
        services={services}
        namespaces={namespaces}
      />

<div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
  <div className="rounded-2xl bg-green-100 p-6">
    <p className="font-semibold text-green-700">Running Pods</p>
    <h2 className="text-3xl font-bold">
      {pods.filter((p) => p.status === "Running").length}
    </h2>
  </div>

  <div className="rounded-2xl bg-yellow-100 p-6">
    <p className="font-semibold text-yellow-700">Pending Pods</p>
    <h2 className="text-3xl font-bold">
      {pods.filter((p) => p.status === "Pending").length}
    </h2>
  </div>

  <div className="rounded-2xl bg-red-100 p-6">
    <p className="font-semibold text-red-700">Failed Pods</p>
    <h2 className="text-3xl font-bold">
      {pods.filter(
        (p) => p.status !== "Running" && p.status !== "Pending"
      ).length}
    </h2>
  </div>

  <div className="rounded-2xl bg-cyan-100 p-6">
    <p className="font-semibold text-cyan-700">Total Pods</p>
    <h2 className="text-3xl font-bold">
      {pods.length}
    </h2>
  </div>
</div>

      <NodeTable nodes={nodes} />

      <PodTable pods={pods} />

      <DeploymentTable deployments={deployments} />
      
      <ServiceTable services={services} />

      <NamespaceTable namespaces={namespaces} />

    </div>
  );
}

export default KubernetesDashboard;

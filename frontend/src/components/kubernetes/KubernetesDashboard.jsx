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

  const loadData = async () => {
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Kubernetes Connected ✅
      </h2>

      <ClusterCards
        cluster={cluster}
        nodes={nodes}
        pods={pods}
        deployments={deployments}
        services={services}
        namespaces={namespaces}
      />

      <NodeTable nodes={nodes} />

      <PodTable pods={pods} />

      <DeploymentTable deployments={deployments} />
      
      <ServiceTable services={services} />

      <NamespaceTable namespaces={namespaces} />

    </div>
  );
}

export default KubernetesDashboard;

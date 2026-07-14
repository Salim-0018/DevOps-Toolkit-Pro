const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();

try {
  kc.loadFromDefault();
} catch (err) {
  console.error("Failed to load kubeconfig:", err.message);
}

const coreApi = kc.makeApiClient(k8s.CoreV1Api);
const appsApi = kc.makeApiClient(k8s.AppsV1Api);

async function getClusterInfo() {
  const cluster = kc.getCurrentCluster();

  return {
    cluster: cluster?.name || "Unknown",
    status: "Connected",
  };
}

async function getNodes() {
  const res = await coreApi.listNode();

  return res.items.map((node) => ({
    name: node.metadata.name,
    status:
      node.status.conditions.find((c) => c.type === "Ready")?.status === "True"
        ? "Ready"
        : "Not Ready",
    version: node.status.nodeInfo.kubeletVersion,
    os: node.status.nodeInfo.osImage,
    runtime: node.status.nodeInfo.containerRuntimeVersion,
  }));
}

async function getPods() {
  const res = await coreApi.listPodForAllNamespaces();

  return res.items.map((pod) => ({
    name: pod.metadata.name,
    namespace: pod.metadata.namespace,
    status: pod.status.phase,
    node: pod.spec.nodeName,
  }));
}

async function getDeployments() {
  const res = await appsApi.listDeploymentForAllNamespaces();

  return res.items.map((dep) => ({
    name: dep.metadata.name,
    namespace: dep.metadata.namespace,
    replicas: dep.spec.replicas,
    available: dep.status.availableReplicas || 0,
  }));
}

async function getServices() {
  const res = await coreApi.listServiceForAllNamespaces();

  return res.items.map((svc) => ({
    name: svc.metadata.name,
    namespace: svc.metadata.namespace,
    type: svc.spec.type,
    clusterIP: svc.spec.clusterIP,
  }));
}

async function getNamespaces() {
  const res = await coreApi.listNamespace();

  return res.items.map((ns) => ({
    name: ns.metadata.name,
    status: ns.status.phase,
  }));
}

async function getPodLogs(namespace, pod) {
  const logs = await coreApi.readNamespacedPodLog({
    name: pod,
    namespace,
    tailLines: 200,
  });

   return logs.body || logs;
}

module.exports = {
  getClusterInfo,
  getOverview,
  getNodes,
  getPods,
  getDeployments,
  getServices,
  getNamespaces,
  getPodLogs,
};

async function getOverview() {

  const nodes = await coreApi.listNode();
  const pods = await coreApi.listPodForAllNamespaces();
  const namespaces = await coreApi.listNamespace();
  const deployments = await appsApi.listDeploymentForAllNamespaces();
  const services = await coreApi.listServiceForAllNamespaces();


  const runningPods = pods.items.filter(
    pod => pod.status.phase === "Running"
  );


  return {
    nodes: nodes.items.length,

    pods: pods.items.length,

    runningPods: runningPods.length,

    namespaces: namespaces.items.length,

    deployments: deployments.items.length,

    services: services.items.length
  };

}

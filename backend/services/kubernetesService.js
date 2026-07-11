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
  const version = await kc.getCurrentCluster();

  return {
    cluster: version?.name || "Unknown",
    status: "Connected",
  };
}

async function getNodes() {
  const res = await coreApi.listNode();

  return res.items.map((node) => ({
    name: node.metadata.name,
    status:
      node.status.conditions.find(
        (c) => c.type === "Ready"
      )?.status === "True"
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

module.exports = {
  getClusterInfo,
  getNodes,
  getPods,
  getDeployments,
  getServices,
  getNamespaces,
};

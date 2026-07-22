const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();

try {
  kc.loadFromDefault();
} catch (err) {
  console.error("Failed to load kubeconfig:", err.message);
}

const coreApi = kc.makeApiClient(k8s.CoreV1Api);
const appsApi = kc.makeApiClient(k8s.AppsV1Api);

module.exports = {
  kc,
  coreApi,
  appsApi,
};

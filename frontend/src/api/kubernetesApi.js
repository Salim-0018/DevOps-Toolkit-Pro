const API = "/api/kubernetes";

export async function getCluster() {
  const res = await fetch(`${API}/cluster`);
  return res.json();
}

export async function getNodes() {
  const res = await fetch(`${API}/nodes`);
  return res.json();
}

export async function getPods() {
  const res = await fetch(`${API}/pods`);
  return res.json();
}

export async function getDeployments() {
  const res = await fetch(`${API}/deployments`);
  return res.json();
}

export async function getServices() {
  const res = await fetch(`${API}/services`);
  return res.json();
}

export async function getNamespaces() {
  const res = await fetch(`${API}/namespaces`);
  return res.json();
}
export const getPodLogs = async (namespace, pod) => {
  const res = await fetch(
    `${API}/logs/${namespace}/${pod}`
  );

  return res.json();
};

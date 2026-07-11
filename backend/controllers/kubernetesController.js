const kubernetesService = require("../services/kubernetesService");

async function getCluster(req, res) {
  try {
    const data = await kubernetesService.getClusterInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getNodes(req, res) {
  try {
    const data = await kubernetesService.getNodes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPods(req, res) {
  try {
    const data = await kubernetesService.getPods();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getDeployments(req, res) {
  try {
    const data = await kubernetesService.getDeployments();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getServices(req, res) {
  try {
    const data = await kubernetesService.getServices();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getNamespaces(req, res) {
  try {
    const data = await kubernetesService.getNamespaces();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getCluster,
  getNodes,
  getPods,
  getDeployments,
  getServices,
  getNamespaces,
};

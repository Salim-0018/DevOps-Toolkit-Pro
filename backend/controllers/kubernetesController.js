const kubernetesService = require("../services/kubernetesService");

async function getCluster(req, res) {
  try {
    res.json(await kubernetesService.getClusterInfo());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getNodes(req, res) {
  try {
    res.json(await kubernetesService.getNodes());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPods(req, res) {
  try {
    res.json(await kubernetesService.getPods());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getDeployments(req, res) {
  try {
    res.json(await kubernetesService.getDeployments());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getServices(req, res) {
  try {
    res.json(await kubernetesService.getServices());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getNamespaces(req, res) {
  try {
    res.json(await kubernetesService.getNamespaces());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOverview(req, res) {
  try {
    res.json(await kubernetesService.getOverview());
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getPodLogs(req, res) {
  try {
    const { namespace, pod } = req.params;

    const logs = await kubernetesService.getPodLogs(namespace, pod);

    res.json({
      logs,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getCluster,
  getOverview,
  getNodes,
  getPods,
  getDeployments,
  getServices,
  getNamespaces,
  getPodLogs,
};

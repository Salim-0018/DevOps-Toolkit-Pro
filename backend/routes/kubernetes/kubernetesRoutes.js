const express = require("express");

const router = express.Router();

const kubernetesController = require("../../controllers/kubernetes/kubernetesController");

router.get("/cluster", kubernetesController.getCluster);

router.get("/overview", kubernetesController.getOverview);

router.get("/nodes", kubernetesController.getNodes);

router.get("/pods", kubernetesController.getPods);

router.get("/deployments", kubernetesController.getDeployments);

router.get("/services", kubernetesController.getServices);

router.get("/namespaces", kubernetesController.getNamespaces);

router.get(
  "/logs/:namespace/:pod",
  kubernetesController.getPodLogs
);

module.exports = router;

const express = require("express");

const router = express.Router();

const kubernetesController = require("../controllers/kubernetesController");

router.get("/cluster", kubernetesController.getCluster);

router.get("/nodes", kubernetesController.getNodes);

router.get("/pods", kubernetesController.getPods);

router.get("/deployments", kubernetesController.getDeployments);

router.get("/services", kubernetesController.getServices);

router.get("/namespaces", kubernetesController.getNamespaces);

module.exports = router;

const express = require("express");

const router = express.Router();

const {
  getNetworks,
  getNetwork,
  createNetwork,
  deleteNetwork,
  connectContainer,
  disconnectContainer,
  getConnectedContainers,
  getNetworkSummary,
  searchNetworks,
  getNetworkHealth,
} = require("../../controllers/dockerNetwork/dockerNetworkController");

// ==========================
// Networks
// ==========================

router.get("/", getNetworks);

router.get("/summary", getNetworkSummary);

router.get("/health", getNetworkHealth);

router.get("/search", searchNetworks);

router.get("/:id", getNetwork);

router.get("/:id/containers", getConnectedContainers);

router.post("/", createNetwork);

router.post("/:id/connect", connectContainer);

router.post("/:id/disconnect", disconnectContainer);

router.delete("/:id", deleteNetwork);

module.exports = router;

const express = require("express");

const router = express.Router();

const {
  getPods,
  getRunningPods,
  getNodeCPU,
  getSummary,
  health,
  getMetrics,
} = require("../../controllers/prometheus/prometheusController");

// Health
router.get("/health", health);

// Pods
router.get("/pods", getPods);
router.get("/running-pods", getRunningPods);

// Summary
router.get("/summary", getSummary);

// CPU
router.get("/cpu", getNodeCPU);

router.get("/metrics", getMetrics);

module.exports = router;





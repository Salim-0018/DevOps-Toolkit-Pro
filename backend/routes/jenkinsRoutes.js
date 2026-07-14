const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJobDetails,
  getBuilds,
  health,
  build,
  queue,
  nodes,
  logs,
  lastBuild,
} = require("../controllers/jenkinsController");

// Health
router.get("/health", health);

// Jobs
router.get("/jobs", getAllJobs);
router.get("/jobs/:name", getJobDetails);
router.get("/jobs/:name/builds", getBuilds);
router.get("/jobs/:name/last-build", lastBuild);

// Build Actions
router.post("/jobs/:name/build", build);

// Queue & Nodes
router.get("/queue", queue);
router.get("/nodes", nodes);

// Console Logs
router.get("/jobs/:name/logs/:build", logs);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getContainers,
  getContainerDetails,
  getContainerStats,
  getContainerLogs,
  startContainer,
  stopContainer,
  restartContainer,
  deleteContainer,
  getImages,
  pullImage,
  deleteImage,
} = require("../controllers/dockerController");

// Containers
router.get("/containers", getContainers);
router.get("/container/:name", getContainerDetails);
router.get("/container/:name/stats", getContainerStats);
router.get("/container/:name/logs", getContainerLogs);

router.post("/container/:name/start", startContainer);
router.post("/container/:name/stop", stopContainer);
router.post("/container/:name/restart", restartContainer);
router.delete("/container/:name", deleteContainer);

// Images
router.get("/images", getImages);
router.delete("/images/:id", deleteImage);
router.post("/images/pull", pullImage);
module.exports = router;


















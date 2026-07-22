const express = require("express");

const router = express.Router();

const monitoringController = require("../../controllers/monitoring/monitoringController");
const systemController = require("../../controllers/monitoring/systemController");
const networkController = require("../../controllers/monitoring/networkController");
const dockerController = require("../../controllers/monitoring/dockerController");
const dockerEventsController = require("../../controllers/monitoring/dockerEventsController");
const diskController = require("../../controllers/monitoring/diskController");
const processController = require("../../controllers/monitoring/processController");
const logController = require("../../controllers/monitoring/logController");
const alertController = require("../../controllers/monitoring/alertController");
const dockerStreamController = require("../../controllers/monitoring/dockerStreamController");

router.get("/", monitoringController.getMonitoring);

router.get("/system", systemController.getSystem);

router.get("/network", networkController.getNetwork);

router.get("/docker", dockerController.getDocker);

router.get("/docker-events", dockerEventsController.getEvents);

router.get("/disk", diskController.getDisk);

router.get("/processes", processController.getProcesses);

router.get("/logs", logController.getLiveLogs);

router.get("/alerts", alertController.alerts);

router.get("/docker-stream", dockerStreamController.streamDockerEvents);

module.exports = router;




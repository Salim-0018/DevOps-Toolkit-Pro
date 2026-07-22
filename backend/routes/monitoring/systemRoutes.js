const express = require("express");

const router = express.Router();

const controller = require("../../controllers/monitoring/systemController");

router.get("/", controller.getSystem);

module.exports = router;

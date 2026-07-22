const express = require("express");

const router = express.Router();

const controller = require("../../controllers/dockerVolume/dockerVolumeController");

router.get("/", controller.getVolumes);

router.post("/", controller.createVolume);

router.delete("/:name", controller.deleteVolume);

module.exports = router;

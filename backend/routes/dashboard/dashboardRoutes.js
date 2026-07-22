const express = require("express");
const router = express.Router();

const {
  getDashboard,
} = require("../../controllers/dashboard/dashboardController");

router.get("/", getDashboard);

module.exports = router;

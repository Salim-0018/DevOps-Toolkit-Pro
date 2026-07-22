const express = require("express");

const router = express.Router();

const aiController = require("../../controllers/ai/aiController");

router.post("/ask", aiController.askAI);

router.post("/stream", aiController.streamAI);

module.exports = router;

const prometheusService = require("../../services/prometheus/prometheusService");

// ==========================
// Health
// ==========================
exports.health = (req, res) => {
  res.json({
    success: true,
    service: "Prometheus",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
};

// ==========================
// Pods
// ==========================
exports.getPods = async (req, res) => {
  try {
    const data = await prometheusService.getPods();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ==========================
// Running Pods
// ==========================
exports.getRunningPods = async (req, res) => {
  try {
    const data = await prometheusService.getRunningPods();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ==========================
// CPU
// ==========================
exports.getNodeCPU = async (req, res) => {
  try {
    const data = await prometheusService.getNodeCPU();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ==========================
// Summary
// ==========================
exports.getSummary = async (req, res) => {
  try {
    const pods = await prometheusService.getPods();

    res.json({
      totalPods: pods.length,
      pods,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


exports.getMetrics = async (req, res) => {
  try {
    const pods = await prometheusService.getPods();
    const runningPods = await prometheusService.getRunningPods();
    const cpu = await prometheusService.getNodeCPU();

    res.json({
      totalPods: pods.length,
      runningPods,
      cpu,
      pods,
      status: "Healthy",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

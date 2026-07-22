const monitoringService = require("../../services/monitoring/monitoringService");

exports.getMonitoring = async (req, res) => {
  try {
    const data = await monitoringService.getMonitoring();

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

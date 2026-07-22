const {
  getSystemStats,
} = require("../../services/monitoring/systemService");

async function getSystem(req, res) {
  try {

    const stats = await getSystemStats();

    res.json(stats);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

module.exports = {
  getSystem,
};

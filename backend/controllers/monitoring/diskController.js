const {
  getDiskStats,
} = require("../../services/monitoring/diskService");

async function getDisk(req, res) {

  try {

    const data = await getDiskStats();

    res.json(data);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

}

module.exports = {
  getDisk,
};

const {
  getNetworkStats,
} = require("../../services/monitoring/networkService");

async function getNetwork(req, res) {

  try {

    const data = await getNetworkStats();

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
  getNetwork,
};

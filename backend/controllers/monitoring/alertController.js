const {
  getAlerts,
} = require("../../services/monitoring/alertService");

async function alerts(req, res) {

  try {

    const data = await getAlerts();

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
  alerts,
};

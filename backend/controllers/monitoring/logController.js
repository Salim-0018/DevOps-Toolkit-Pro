const {
  getLogs,
} = require("../../services/monitoring/logService");

async function getLiveLogs(req, res) {

  try {

    const logs = await getLogs();

    res.json(logs);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

}

module.exports = {
  getLiveLogs,
};

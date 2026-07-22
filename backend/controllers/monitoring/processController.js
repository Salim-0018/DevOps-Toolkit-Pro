const {
  getTopProcesses,
} = require("../../services/monitoring/processService");

async function getProcesses(req, res) {

  try {

    const data = await getTopProcesses();

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
  getProcesses,
};

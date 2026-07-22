const {
  getDockerStats,
} = require("../../services/monitoring/dockerService");

async function getDocker(req, res) {

  try {

    const data = await getDockerStats();

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
  getDocker,
};

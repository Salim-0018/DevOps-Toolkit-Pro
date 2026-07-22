const {
  getDockerEvents,
} = require("../../services/monitoring/dockerEventsService");

async function getEvents(req, res) {

  try {

    const data = await getDockerEvents();

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
  getEvents,
};

const service = require("../../services/dockerVolume/dockerVolumeService");

exports.getVolumes = async (req, res) => {
  try {
    const data = await service.getVolumes();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.createVolume = async (req, res) => {
  try {
    const data = await service.createVolume(req.body.name);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteVolume = async (req, res) => {
  try {
    const data = await service.deleteVolume(req.params.name);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const jenkinsService = require("../services/jenkinsService");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jenkinsService.getJobs();

    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const job = await jenkinsService.getJob(req.params.name);

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBuilds = async (req, res) => {
  try {
    const builds = await jenkinsService.getBuildHistory(
      req.params.name
    );

    res.json({
      success: true,
      count: builds.length,
      builds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const health = async (req, res) => {
  try {
    const data = await jenkinsService.getJenkinsHealth();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const build = async (req, res) => {
  try {
    const data = await jenkinsService.triggerBuild(
      req.params.name
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const queue = async (req, res) => {
  try {
    const data = await jenkinsService.getQueue();

    res.json({
      success: true,
      count: data.length,
      queue: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const nodes = async (req, res) => {
  try {
    const data = await jenkinsService.getNodes();

    res.json({
      success: true,
      count: data.length,
      nodes: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logs = async (req, res) => {
  try {
    const data = await jenkinsService.getConsoleLogs(
      req.params.name,
      req.params.build
    );

    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const lastBuild = async (req, res) => {
  try {
    const data = await jenkinsService.getLastBuild(
      req.params.name
    );

    res.json({
      success: true,
      build: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllJobs,
  getJobDetails,
  getBuilds,
  health,
  build,
  queue,
  nodes,
  logs,
  lastBuild,
};


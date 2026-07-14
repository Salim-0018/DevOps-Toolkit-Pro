const axios = require("axios");

const client = axios.create({
  baseURL: process.env.JENKINS_URL,
  auth: {
    username: process.env.JENKINS_USER,
    password: process.env.JENKINS_TOKEN,
  },
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
});

async function getJobs() {
  try {
    const { data } = await client.get(
      "/api/json?tree=jobs[name,color,url]"
    );

    return data.jobs || [];
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getJob(jobName) {
  try {
    const { data } = await client.get(
      `/job/${encodeURIComponent(jobName)}/api/json`
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getBuildHistory(jobName) {
  try {
    const { data } = await client.get(
      `/job/${encodeURIComponent(
        jobName
      )}/api/json?tree=builds[number,result,duration,timestamp,url]`
    );

    return data.builds || [];
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getJenkinsHealth() {
  try {
    const { data } = await client.get("/api/json");

    return {
      success: true,
      mode: data.mode,
      nodeName: data.nodeName,
      numExecutors: data.numExecutors,
      useCrumbs: data.useCrumbs,
      version: data.version || "Unknown",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

async function triggerBuild(jobName) {
  try {
    await client.post(
      `/job/${encodeURIComponent(jobName)}/build`
    );

    return {
      success: true,
      message: "Build Triggered Successfully",
    };
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getQueue() {
  try {
    const { data } = await client.get(
      "/queue/api/json"
    );

    return data.items || [];
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getNodes() {
  try {
    const { data } = await client.get(
      "/computer/api/json"
    );

    return data.computer || [];
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getConsoleLogs(jobName, buildNumber) {
  try {
    const { data } = await client.get(
      `/job/${encodeURIComponent(
        jobName
      )}/${buildNumber}/consoleText`
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

async function getLastBuild(jobName) {
  try {
    const { data } = await client.get(
      `/job/${encodeURIComponent(
        jobName
      )}/lastBuild/api/json`
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data || error.message
    );
  }
}

module.exports = {
  getJobs,
  getJob,
  getBuildHistory,
  getJenkinsHealth,
  triggerBuild,
  getQueue,
  getNodes,
  getConsoleLogs,
  getLastBuild,
};

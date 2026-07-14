import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/jenkins",
  timeout: 10000,
});

export const getHealth = async () => {
  const { data } = await api.get("/health");
  return data;
};

export const getJobs = async () => {
  const { data } = await api.get("/jobs");
  return data.jobs;
};

export const getJob = async (name) => {
  const { data } = await api.get(`/jobs/${name}`);
  return data.job;
};

export const getBuilds = async (name) => {
  const { data } = await api.get(`/jobs/${name}/builds`);
  return data.builds;
};

export const triggerBuild = async (name) => {
  const { data } = await api.post(`/jobs/${name}/build`);
  return data;
};

export const getQueue = async () => {
  const { data } = await api.get("/queue");
  return data.queue;
};

export const getNodes = async () => {
  const { data } = await api.get("/nodes");
  return data.nodes;
};

export const getConsoleLogs = async (name, build) => {
  const { data } = await api.get(`/jobs/${name}/logs/${build}`);
  return data;
};

export const getLastBuild = async (name) => {
  const { data } = await api.get(`/jobs/${name}/last-build`);
  return data.build;
};

export default api;

module.exports = {
  baseUrl: process.env.JENKINS_URL || "http://localhost:8080",
  username: process.env.JENKINS_USER || "",
  token: process.env.JENKINS_TOKEN || "",
};

const Docker = require("dockerode");

const docker = new Docker();

async function getLogs() {

  const containers = await docker.listContainers();

  if (containers.length === 0) {
    return [];
  }

  const container = docker.getContainer(containers[0].Id);

  const logs = await container.logs({
    stdout: true,
    stderr: true,
    tail: 20,
  });

  return logs
    .toString()
    .split("\n")
    .filter(Boolean);

}

module.exports = {
  getLogs,
};

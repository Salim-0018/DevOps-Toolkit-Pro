const Docker = require("dockerode");

const docker = new Docker();

async function getDockerStats() {

  const containers = await docker.listContainers({ all: true });

  const images = await docker.listImages();

  const volumes = await docker.listVolumes();

  const networks = await docker.listNetworks();

  return {

    containers: containers.length,

    running: containers.filter(
      c => c.State === "running"
    ).length,

    stopped: containers.filter(
      c => c.State !== "running"
    ).length,

    images: images.length,

    volumes: volumes.Volumes
      ? volumes.Volumes.length
      : 0,

    networks: networks.length,

  };

}

module.exports = {
  getDockerStats,
};

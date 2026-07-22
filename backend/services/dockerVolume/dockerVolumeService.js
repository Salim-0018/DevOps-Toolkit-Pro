const Docker = require("dockerode");

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

exports.getVolumes = async () => {
  const result = await docker.listVolumes();

  return result.Volumes.map((volume) => ({
    name: volume.Name,
    driver: volume.Driver,
    mountpoint: volume.Mountpoint,
    created: volume.CreatedAt,
    scope: volume.Scope,
    labels: volume.Labels || {},
    options: volume.Options || {},
  }));
};

exports.createVolume = async (name) => {
  await docker.createVolume({
    Name: name,
  });

  return {
    success: true,
    message: "Volume Created Successfully",
  };
};

exports.deleteVolume = async (name) => {
  const volume = docker.getVolume(name);

  await volume.remove();

  return {
    success: true,
    message: "Volume Deleted Successfully",
  };
};

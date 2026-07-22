const docker = require("../../services/docker/dockerService");

exports.getContainers = async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });

    const result = containers.map((c) => ({
      id: c.Id,
      name: c.Names[0].replace("/", ""),
      image: c.Image,
      status: c.Status,
      ports: c.Ports.map(
        (p) =>
          `${p.PublicPort || ""}:${p.PrivatePort}/${p.Type}`
      ).join(", "),
    }));

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};


exports.getContainerDetails = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);
    const info = await container.inspect();

    res.json({
      name: info.Name.replace("/", ""),
      image: info.Config.Image,
      status: info.State.Status,
      running: info.State.Running,
      startedAt: info.State.StartedAt,
      finishedAt: info.State.FinishedAt,
      restartCount: info.RestartCount,
      ports: info.NetworkSettings.Ports,
      ip: info.NetworkSettings.IPAddress,
      platform: info.Platform,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};


exports.getContainerStats = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);

    const stats = await container.stats({ stream: false });

    const cpu =
      (
        (
          (stats.cpu_stats.cpu_usage.total_usage -
            stats.precpu_stats.cpu_usage.total_usage) /
          (stats.cpu_stats.system_cpu_usage -
            stats.precpu_stats.system_cpu_usage)
        ) *
        stats.cpu_stats.online_cpus *
        100
      ).toFixed(2) + "%";

    const memory =
      (
        stats.memory_stats.usage /
        1024 /
        1024
      ).toFixed(1) +
      " MB / " +
      (
        stats.memory_stats.limit /
        1024 /
        1024
      ).toFixed(0) +
      " MB";

    const network = Object.values(stats.networks || {})
      .map(
        (n) =>
          `RX ${(
            n.rx_bytes /
            1024 /
            1024
          ).toFixed(1)}MB | TX ${(
            n.tx_bytes /
            1024 /
            1024
          ).toFixed(1)}MB`
      )
      .join(",");

    const blockIO = stats.blkio_stats.io_service_bytes_recursive
      ? stats.blkio_stats.io_service_bytes_recursive
          .map(
            (i) =>
              `${i.op}:${(
                i.value /
                1024 /
                1024
              ).toFixed(1)}MB`
          )
          .join(" ")
      : "N/A";

    res.json({
      cpu,
      memory,
      network,
      block_io: blockIO,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getContainerLogs = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);

    const logs = await container.logs({
      stdout: true,
      stderr: true,
      tail: 200,
    });

    res.json({
      logs: logs.toString(),
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.startContainer = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);

    await container.start();

    res.json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.stopContainer = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);

    await container.stop();

    res.json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.restartContainer = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);

    await container.restart();

    res.json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteContainer = async (req, res) => {
  try {
    const container = docker.getContainer(req.params.name);

    await container.remove({
      force: true,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.getImages = async (req, res) => {
  try {
    const images = await docker.listImages();

    const result = images.map((img) => ({
      id: img.Id,
      tags: img.RepoTags || ["<none>"],
      size: (img.Size / 1024 / 1024).toFixed(2) + " MB",
      created: new Date(img.Created * 1000).toLocaleString(),
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const image = docker.getImage(req.params.id);

    await image.remove({
      force: true,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};



exports.pullImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "Image name is required",
      });
    }

    docker.pull(image, (err, stream) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      docker.modem.followProgress(stream, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        res.json({
          success: true,
          message: `${image} pulled successfully`,
        });
      });
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

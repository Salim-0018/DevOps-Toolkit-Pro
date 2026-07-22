const { spawn } = require("child_process");

exports.streamDockerEvents = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const docker = spawn("docker", ["events"]);

  docker.stdout.on("data", (data) => {
    res.write(`data: ${data.toString()}\n\n`);
  });

  docker.stderr.on("data", (err) => {
    res.write(`data: ERROR: ${err.toString()}\n\n`);
  });

  req.on("close", () => {
    docker.kill();
    res.end();
  });
};

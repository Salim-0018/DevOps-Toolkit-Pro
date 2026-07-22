const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

exports.getPods = async () => {
  const { stdout } = await execAsync("kubectl get pods --no-headers 2>/dev/null || true");

  return stdout
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const p = line.trim().split(/\s+/);

      return {
        name: p[0],
        ready: p[1],
        status: p[2],
        restarts: p[3],
        age: p[4],
      };
    });
};

exports.getRunningPods = async () => {
  const pods = await exports.getPods();

  return pods.filter((p) => p.status === "Running").length;
};

exports.getNodeCPU = async () => {
  try {
    const { stdout } = await execAsync(
      "kubectl top nodes --no-headers 2>/dev/null || true"
    );

    if (!stdout.trim()) return 0;

    const cpu = stdout.trim().split(/\s+/)[1];

    return cpu;
  } catch {
    return 0;
  }
};

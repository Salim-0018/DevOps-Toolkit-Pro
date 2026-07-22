const Docker = require("dockerode");
const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

const kubeService = require("../kubernetes/kubernetesService");

exports.getDashboard = async () => {
  const containers = await docker.listContainers({ all: true });

  let kubeOverview = {
    nodes: 0,
    pods: 0,
    runningPods: 0,
    namespaces: 0,
    deployments: 0,
    services: 0,
  };

  try {
    kubeOverview = await kubeService.getOverview();
  } catch (err) {
    console.log("Kubernetes overview failed:", err.message);
  }

  return {
    servers: 1,
    docker: containers.length,
    kubernetes: kubeOverview.nodes,
    jenkins: 1,

    cpu: 25,
    memory: 40,
    disk: "60%",
    network: "Healthy",

    kubeOverview,
  };
};

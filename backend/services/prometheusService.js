const axios = require("axios");

const PROMETHEUS_URL = "http://localhost:9090";


async function queryPrometheus(query) {

  const response = await axios.get(
    `${PROMETHEUS_URL}/api/v1/query`,
    {
      params: {
        query
      }
    }
  );

  return response.data.data.result;
}



async function getPods(){

  const result = await queryPrometheus(
    "kube_pod_info"
  );


  return result.map(item => ({
    name: item.metric.pod,
    namespace: item.metric.namespace,
    node: item.metric.node
  }));

}


async function getRunningPods(){

  const result = await queryPrometheus(
    "kube_pod_info"
  );


  return result.map(item => ({
    pod: item.metric.pod,
    namespace: item.metric.namespace,
    node: item.metric.node,
    status: "Running"
  }));

}



async function getNodeCPU(){

  return await queryPrometheus(
    "node_cpu_seconds_total"
  );

}



module.exports = {
  getPods,
  getRunningPods,
  getNodeCPU
};

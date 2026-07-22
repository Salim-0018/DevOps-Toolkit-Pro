const si = require("systeminformation");

async function getTopProcesses() {

  const data = await si.processes();

  return data.list
    .sort((a, b) => b.cpu - a.cpu)
    .slice(0, 8)
    .map((p) => ({
      pid: p.pid,
      name: p.name,
      cpu: Number(p.cpu.toFixed(1)),
      memory: Number(p.mem.toFixed(1)),
    }));

}

module.exports = {
  getTopProcesses,
};

const si = require("systeminformation");

async function getSystemStats() {

  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const fs = await si.fsSize();
  const os = await si.osInfo();
  const time = si.time();

  return {
    cpu: Number(cpu.currentLoad.toFixed(1)),
    memory: Number(((mem.used / mem.total) * 100).toFixed(1)),
    disk: fs.length ? `${fs[0].use.toFixed(1)}%` : "0%",
    hostname: os.hostname,
    platform: os.platform,
    uptime: time.uptime,
  };

}

module.exports = {
  getSystemStats,
};

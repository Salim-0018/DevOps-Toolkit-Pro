const si = require("systeminformation");

async function getAlerts() {

  const load = await si.currentLoad();
  const memory = await si.mem();
  const fs = await si.fsSize();

  const alerts = [];

  if (load.currentLoad > 80) {
    alerts.push({
      level: "critical",
      message: `High CPU Usage (${load.currentLoad.toFixed(1)}%)`,
    });
  }

  const memPercent =
    (memory.used / memory.total) * 100;

  if (memPercent > 85) {
    alerts.push({
      level: "warning",
      message: `High Memory Usage (${memPercent.toFixed(1)}%)`,
    });
  }

  if (fs.length && fs[0].use > 90) {
    alerts.push({
      level: "critical",
      message: `Disk Almost Full (${fs[0].use.toFixed(1)}%)`,
    });
  }

  return alerts;

}

module.exports = {
  getAlerts,
};

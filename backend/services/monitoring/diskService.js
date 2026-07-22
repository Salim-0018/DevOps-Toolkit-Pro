const si = require("systeminformation");

async function getDiskStats() {

  const fs = await si.fsStats();

  return {
    read: Math.round(fs.rx_sec || 0),
    write: Math.round(fs.wx_sec || 0),
  };

}

module.exports = {
  getDiskStats,
};

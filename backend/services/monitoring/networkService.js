const si = require("systeminformation");

async function getNetworkStats() {

  const network = await si.networkStats();

  if (!network.length) {
    return {
      rx: 0,
      tx: 0,
      rx_sec: 0,
      tx_sec: 0,
    };
  }

  return {
    rx: network[0].rx_bytes,
    tx: network[0].tx_bytes,
    rx_sec: network[0].rx_sec,
    tx_sec: network[0].tx_sec,
  };

}

module.exports = {
  getNetworkStats,
};

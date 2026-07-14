const Docker = require("dockerode");

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

// ==========================
// Get All Networks
// ==========================

exports.getNetworks = async (req, res) => {
  try {
    const networks = await docker.listNetworks();

    const result = networks.map((network) => ({
      id: network.Id,
      name: network.Name,
      driver: network.Driver,
      scope: network.Scope,
      created: network.Created,
      containers: network.Containers
        ? Object.keys(network.Containers).length
        : 0,
    }));

    res.json(result);

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};

// ==========================
// Network Details
// ==========================

exports.getNetwork = async (req, res) => {

  try {

    const network = docker.getNetwork(req.params.id);

    const info = await network.inspect();

    res.json(info);

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};

// ==========================
// Create Network
// ==========================

exports.createNetwork = async (req, res) => {

  try {

    const { name, driver } = req.body;

    if (!name) {

      return res.status(400).json({
        success: false,
        error: "Network name is required",
      });

    }

    await docker.createNetwork({
      Name: name,
      Driver: driver || "bridge",
    });

    res.json({
      success: true,
      message: "Network Created Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};

// ==========================
// Delete Network
// ==========================

exports.deleteNetwork = async (req, res) => {

  try {

    const network = docker.getNetwork(req.params.id);

    await network.remove();

    res.json({
      success: true,
      message: "Network Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};

// ==========================
// Connect Container
// ==========================

exports.connectContainer = async (req, res) => {

  try {

    const network = docker.getNetwork(req.params.id);

    await network.connect({
      Container: req.body.container,
    });

    res.json({
      success: true,
      message: "Container Connected",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};

// ==========================
// Disconnect Container
// ==========================

exports.disconnectContainer = async (req, res) => {

  try {

    const network = docker.getNetwork(req.params.id);

    await network.disconnect({
      Container: req.body.container,
      Force: true,
    });

    res.json({
      success: true,
      message: "Container Disconnected",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};

// ==========================
// List Connected Containers
// ==========================

exports.getConnectedContainers = async (req, res) => {

  try {

    const network = docker.getNetwork(req.params.id);

    const info = await network.inspect();

    const containers = [];

    if (info.Containers) {

      for (const id in info.Containers) {

        containers.push({

          id,

          name: info.Containers[id].Name || id,

          ipv4: info.Containers[id].IPv4Address,

          ipv6: info.Containers[id].IPv6Address,

          mac: info.Containers[id].MacAddress,

        });

      }

    }

    res.json(containers);

  } catch (err) {

    res.status(500).json({

      success: false,

      error: err.message,

    });

  }

};

// ==========================
// Network Summary
// ==========================

exports.getNetworkSummary = async (req, res) => {

  try {

    const networks = await docker.listNetworks();

    const bridge = networks.filter(
      (n) => n.Driver === "bridge"
    ).length;

    const host = networks.filter(
      (n) => n.Driver === "host"
    ).length;

    const overlay = networks.filter(
      (n) => n.Driver === "overlay"
    ).length;

    const macvlan = networks.filter(
      (n) => n.Driver === "macvlan"
    ).length;

    res.json({

      total: networks.length,

      bridge,

      host,

      overlay,

      macvlan,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      error: err.message,

    });

  }

};

// ==========================
// Search Networks
// ==========================

exports.searchNetworks = async (req, res) => {

  try {

    const keyword = (req.query.q || "").toLowerCase();

    const networks = await docker.listNetworks();

    const result = networks.filter((network) =>

      network.Name.toLowerCase().includes(keyword) ||

      network.Driver.toLowerCase().includes(keyword)

    );

    res.json(result);

  } catch (err) {

    res.status(500).json({

      success: false,

      error: err.message,

    });

  }

};

// ==========================
// Network Health
// ==========================

exports.getNetworkHealth = async (req, res) => {

  try {

    const networks = await docker.listNetworks();

    res.json({

      success: true,

      dockerRunning: true,

      totalNetworks: networks.length,

      timestamp: new Date().toISOString(),

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      dockerRunning: false,

      error: err.message,

    });

  }

};

const API = "/api/docker-networks";

// ==========================
// Get All Networks
// ==========================

export async function getNetworks() {
  const res = await fetch(API);
  return res.json();
}

// ==========================
// Summary
// ==========================

export async function getNetworkSummary() {
  const res = await fetch(`${API}/summary`);
  return res.json();
}

// ==========================
// Health
// ==========================

export async function getNetworkHealth() {
  const res = await fetch(`${API}/health`);
  return res.json();
}

// ==========================
// Search
// ==========================

export async function searchNetworks(keyword) {
  const res = await fetch(
    `${API}/search?q=${encodeURIComponent(keyword)}`
  );
  return res.json();
}

// ==========================
// Details
// ==========================

export async function getNetwork(id) {
  const res = await fetch(`${API}/${id}`);
  return res.json();
}

// ==========================
// Connected Containers
// ==========================

export async function getConnectedContainers(id) {
  const res = await fetch(`${API}/${id}/containers`);
  return res.json();
}

// ==========================
// Create Network
// ==========================

export async function createNetwork(name, driver = "bridge") {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      driver,
    }),
  });

  return res.json();
}

// ==========================
// Delete Network
// ==========================

export async function deleteNetwork(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

// ==========================
// Connect Container
// ==========================

export async function connectContainer(id, container) {
  const res = await fetch(`${API}/${id}/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      container,
    }),
  });

  return res.json();
}

// ==========================
// Disconnect Container
// ==========================

export async function disconnectContainer(id, container) {
  const res = await fetch(`${API}/${id}/disconnect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      container,
    }),
  });

  return res.json();
}

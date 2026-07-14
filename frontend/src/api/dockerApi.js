
const API = "/api/docker";

// Containers
export async function getContainers() {
  const res = await fetch(`${API}/containers`);
  return res.json();
}

// Images
export async function getImages() {
  const res = await fetch(`${API}/images`);
  return res.json();
}

// Container Details
export async function getContainer(name) {
  const res = await fetch(`${API}/container/${name}`);
  return res.json();
}

// Container Stats
export async function getContainerStats(name) {
  const res = await fetch(`${API}/container/${name}/stats`);
  return res.json();
}

// Container Logs
export async function getContainerLogs(name) {
  const res = await fetch(`${API}/container/${name}/logs`);
  return res.json();
}

// Restart
export async function restartContainer(name) {
  const res = await fetch(`${API}/container/${name}/restart`, {
    method: "POST",
  });

  return res.json();
}

// Start
export async function startContainer(name) {
  const res = await fetch(`${API}/container/${name}/start`, {
    method: "POST",
  });

  return res.json();
}

// Stop
export async function stopContainer(name) {
  const res = await fetch(`${API}/container/${name}/stop`, {
    method: "POST",
  });

  return res.json();
}

// Delete Container
export async function deleteContainer(name) {
  const res = await fetch(`${API}/container/${name}`, {
    method: "DELETE",
  });

  return res.json();
}
 
// Pull Docker Image
export async function pullImage(image) {
  const res = await fetch(`${API}/images/pull`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
    }),
  });

  return res.json();
}
// Container Logs
export async function getLogs(name) {
  const res = await fetch(`${API}/container/${name}/logs`);
  return res.json();
}

// Delete Image
export async function deleteImage(id) {
  const res = await fetch(`${API}/images/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

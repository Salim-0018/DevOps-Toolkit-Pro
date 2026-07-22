export async function getVolumes() {
  const res = await fetch("/api/docker-volumes");
  return await res.json();
}

export async function createVolume(name) {
  const res = await fetch("/api/docker-volumes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return await res.json();
}

export async function deleteVolume(name) {
  const res = await fetch(`/api/docker-volumes/${name}`, {
    method: "DELETE",
  });

  return await res.json();
}

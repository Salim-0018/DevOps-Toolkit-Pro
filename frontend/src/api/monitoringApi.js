export async function getMonitoring() {
  const res = await fetch("/api/monitoring");

  if (!res.ok) {
    throw new Error("Failed to load monitoring data");
  }

  return await res.json();
}

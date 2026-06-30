export function getCpuData() {
  return [
    { time: "10:00", usage: Math.floor(Math.random() * 100) },
    { time: "10:10", usage: Math.floor(Math.random() * 100) },
    { time: "10:20", usage: Math.floor(Math.random() * 100) },
    { time: "10:30", usage: Math.floor(Math.random() * 100) },
    { time: "10:40", usage: Math.floor(Math.random() * 100) },
  ];
}

export function getMemoryData() {
  return [
    { time: "10:00", usage: Math.floor(Math.random() * 100) },
    { time: "10:10", usage: Math.floor(Math.random() * 100) },
    { time: "10:20", usage: Math.floor(Math.random() * 100) },
    { time: "10:30", usage: Math.floor(Math.random() * 100) },
    { time: "10:40", usage: Math.floor(Math.random() * 100) },
  ];
}

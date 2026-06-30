function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        🚀 DevOps Toolkit
      </h1>

      <nav>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-cyan-400">📊 Dashboard</li>
          <li className="cursor-pointer hover:text-cyan-400">🐧 Linux</li>
          <li className="cursor-pointer hover:text-cyan-400">🌿 Git</li>
          <li className="cursor-pointer hover:text-cyan-400">🐳 Docker</li>
          <li className="cursor-pointer hover:text-cyan-400">☸ Kubernetes</li>
          <li className="cursor-pointer hover:text-cyan-400">⚙ Jenkins</li>
          <li className="cursor-pointer hover:text-cyan-400">☁ AWS</li>
          <li className="cursor-pointer hover:text-cyan-400">📈 Monitoring</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

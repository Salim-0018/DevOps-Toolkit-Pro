import { LayoutDashboard, Box, GitBranch, Container, Boxes, Settings, Cloud } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-xl font-bold mb-8">
        DevOps Toolkit
      </h1>

      <nav className="space-y-4">
        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <LayoutDashboard size={18} /> Dashboard
        </div>

        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <Box size={18} /> Linux
        </div>

        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <GitBranch size={18} /> Git
        </div>

        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <Container size={18} /> Docker
        </div>

        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <Boxes size={18} /> Kubernetes
        </div>

        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <Settings size={18} /> Jenkins
        </div>

        <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
          <Cloud size={18} /> AWS
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

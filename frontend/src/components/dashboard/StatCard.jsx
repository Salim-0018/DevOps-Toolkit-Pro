import { Server, Container, Boxes, Settings, HardDrive } from "lucide-react";

function StatCard({ title, value, type }) {
  const icons = {
    servers: <Server className="h-6 w-6 text-blue-600" />,
    docker: <Container className="h-6 w-6 text-cyan-600" />,
    kubernetes: <Boxes className="h-6 w-6 text-purple-600" />,
    jenkins: <Settings className="h-6 w-6 text-orange-600" />,
    disk: <HardDrive className="h-6 w-6 text-red-500" />,
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition
      dark:bg-slate-900 dark:text-white">

      <div className="mb-3">
        {icons[type]}
      </div>

      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default StatCard;

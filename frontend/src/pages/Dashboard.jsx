import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        DevOps Dashboard 🚀
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Servers" value="12" icon="🖥️" />
        <StatCard title="Docker Containers" value="28" icon="🐳" />
        <StatCard title="Kubernetes Clusters" value="6" icon="☸️" />
        <StatCard title="Jenkins Jobs" value="14" icon="⚙️" />
      </div>

      <QuickActions />

      <RecentActivity />
    </DashboardLayout>
  );
}

export default Dashboard;

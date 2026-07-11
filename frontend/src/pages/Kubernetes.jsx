import DashboardLayout from "../layouts/DashboardLayout";
import KubernetesDashboard from "../components/kubernetes/KubernetesDashboard";

function Kubernetes() {
  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-extrabold">
          Kubernetes Dashboard
        </h1>

        <p className="mt-2 text-blue-100">
          Monitor Kubernetes Cluster, Nodes, Pods, Deployments, Services and Namespaces
        </p>
      </div>

      <div className="mt-8">
        <KubernetesDashboard />
      </div>
    </DashboardLayout>
  );
}

export default Kubernetes;

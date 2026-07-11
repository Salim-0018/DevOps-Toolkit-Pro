function DeploymentTable({ deployments }) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Deployments
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Deployment</th>
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Replicas</th>
            <th className="p-2 text-left">Available</th>
          </tr>
        </thead>

        <tbody>
          {deployments.map((deployment) => (
            <tr key={deployment.name} className="border-b">
              <td className="p-2">{deployment.name}</td>
              <td className="p-2">{deployment.namespace}</td>
              <td className="p-2">{deployment.replicas}</td>
              <td className="p-2">{deployment.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeploymentTable;

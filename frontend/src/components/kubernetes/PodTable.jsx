function PodTable({ pods }) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Pods
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Pod Name</th>
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Node</th>
          </tr>
        </thead>

        <tbody>
          {pods.map((pod) => (
            <tr key={pod.name} className="border-b">
              <td className="p-2">{pod.name}</td>
              <td className="p-2">{pod.namespace}</td>
              <td className="p-2">{pod.status}</td>
              <td className="p-2">{pod.node}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PodTable;

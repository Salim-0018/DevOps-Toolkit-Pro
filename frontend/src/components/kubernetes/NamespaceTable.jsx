function NamespaceTable({ namespaces }) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Namespaces
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {namespaces.map((namespace) => (
            <tr key={namespace.name} className="border-b">
              <td className="p-2">{namespace.name}</td>
              <td className="p-2">{namespace.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NamespaceTable;

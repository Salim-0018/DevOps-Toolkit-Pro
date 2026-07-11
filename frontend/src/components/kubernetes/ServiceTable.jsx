function ServiceTable({ services }) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Services
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Service</th>
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Cluster IP</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.name} className="border-b">
              <td className="p-2">{service.name}</td>
              <td className="p-2">{service.namespace}</td>
              <td className="p-2">{service.type}</td>
              <td className="p-2">{service.clusterIP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;

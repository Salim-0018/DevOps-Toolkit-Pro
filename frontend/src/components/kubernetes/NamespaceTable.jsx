import { useState } from "react";

function NamespaceTable({ namespaces }) {
  const [search, setSearch] = useState("");

  const filteredNamespaces = namespaces.filter((namespace) =>
    namespace.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold">
        Kubernetes Namespaces
      </h2>

      <input
        type="text"
        placeholder="Search Namespace..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border p-3 dark:bg-slate-800"
      />

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Namespace</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredNamespaces.map((namespace) => (
            <tr key={namespace.name} className="border-b">
              <td className="p-2 font-semibold">
                {namespace.name}
              </td>

              <td className="p-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                  {namespace.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NamespaceTable;

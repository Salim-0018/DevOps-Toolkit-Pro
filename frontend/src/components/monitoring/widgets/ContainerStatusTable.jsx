import { useEffect, useState } from "react";

function ContainerStatusTable() {

  const [containers, setContainers] = useState([]);

  const loadContainers = async () => {
    try {
      const res = await fetch("/api/docker/containers");
      const data = await res.json();

      setContainers(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    loadContainers();

    const id = setInterval(loadContainers,3000);

    return ()=>clearInterval(id);

  },[]);

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Docker Containers
      </h2>

      <div className="overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="pb-4">Container</th>
              <th>Status</th>
              <th>Image</th>
              <th>Ports</th>

            </tr>

          </thead>

          <tbody>

            {containers.map((c)=>(

              <tr
                key={c.id}
                className="border-b border-slate-800"
              >

                <td className="py-4 font-semibold text-white">
                  {c.name}
                </td>

                <td>

                  {c.status.toLowerCase().includes("up") ? (

                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">

                      🟢 Running

                    </span>

                  ) : (

                    <span className="rounded-full bg-red-500/20 px-3 py-1 text-red-400">

                      🔴 Stopped

                    </span>

                  )}

                </td>

                <td className="text-slate-300">
                  {c.image}
                </td>

                <td className="text-slate-300">
                  {c.ports}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ContainerStatusTable;

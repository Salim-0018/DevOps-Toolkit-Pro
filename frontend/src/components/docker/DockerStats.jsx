import {
  Container,
  CheckCircle2,
  XCircle,
  Layers,
} from "lucide-react";

function DockerStats({ containers }) {

  const running = containers.filter((c) =>
    c.status.toLowerCase().includes("up")
  ).length;

  const stopped = containers.length - running;

  const images = new Set(
    containers.map((c) => c.image)
  ).size;

  const stats = [
    {
      title: "Containers",
      value: containers.length,
      icon: Container,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Running",
      value: running,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Stopped",
      value: stopped,
      icon: XCircle,
      color: "from-red-500 to-rose-600",
    },
    {
      title: "Images",
      value: images,
      icon: Layers,
      color: "from-violet-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-3 text-4xl font-black dark:text-white">
                  {item.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl bg-gradient-to-br ${item.color} p-4 text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>

            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

              <div
                className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                style={{
                  width: "100%",
                }}
              />

            </div>

          </div>

        );

      })}

    </div>
  );
}

export default DockerStats;



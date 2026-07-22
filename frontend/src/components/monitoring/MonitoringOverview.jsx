import {
  Cpu,
  MemoryStick,
  HardDrive,
  Box,
  Database,
  Network,
} from "lucide-react";

function MonitoringOverview({ monitoring }) {

  const cards = [
    {
      title: "CPU",
      value: `${monitoring.cpu}%`,
      icon: Cpu,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Memory",
      value: `${monitoring.memory}%`,
      icon: MemoryStick,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Disk",
      value: monitoring.disk,
      icon: HardDrive,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Containers",
      value: monitoring.containers,
      icon: Box,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Images",
      value: monitoring.images,
      icon: Database,
      color: "from-indigo-500 to-violet-600",
    },
    {
      title: "Networks",
      value: monitoring.networks,
      icon: Network,
      color: "from-sky-500 to-cyan-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-black dark:text-white">
                  {card.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white`}
              >
                <Icon size={28}/>
              </div>

            </div>

          </div>

        );

      })}

    </div>
  );
}

export default MonitoringOverview;

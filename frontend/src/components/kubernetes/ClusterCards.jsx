import {
  Server,
  Box,
  Boxes,
  Network,
  Layers,
  Database,
} from "lucide-react";

const cards = [
  {
    title: "Cluster",
    key: "cluster",
    icon: Server,
    color: "text-cyan-600",
  },
  {
    title: "Nodes",
    key: "nodes",
    icon: Box,
    color: "text-green-600",
  },
  {
    title: "Pods",
    key: "pods",
    icon: Boxes,
    color: "text-blue-600",
  },
  {
    title: "Deployments",
    key: "deployments",
    icon: Layers,
    color: "text-purple-600",
  },
  {
    title: "Services",
    key: "services",
    icon: Network,
    color: "text-orange-600",
  },
  {
    title: "Namespaces",
    key: "namespaces",
    icon: Database,
    color: "text-pink-600",
  },
];

function ClusterCards({
  cluster,
  nodes,
  pods,
  deployments,
  services,
  namespaces,
}) {
  const values = {
    cluster: cluster.cluster || "-",
    nodes: nodes.length,
    pods: pods.length,
    deployments: deployments.length,
    services: services.length,
    namespaces: namespaces.length,
  };

  return (
    <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-xl dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <Icon
                size={34}
                className={card.color}
              />

              <span className="text-sm text-slate-500">
                {card.title}
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              {values[card.key]}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default ClusterCards;

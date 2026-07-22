import {
  Cpu,
  MemoryStick,
  HardDrive,
  Boxes,
  Image,
  Network,
} from "lucide-react";

function Item({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-4 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function SystemStatus({ system, docker, monitoring }) {
   
   if (!system || !docker) {

  return (
    <div className="rounded-2xl bg-slate-900 p-6 text-center text-white">
      Loading System Information...
    </div>
  );

}

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <Item
        title="CPU"
        value={`${system.cpu}%`}
        icon={<Cpu className="text-white"/>}
        color="bg-blue-600"
      />

      <Item
        title="Memory"
        value={`${system.memory}%`}
        icon={<MemoryStick className="text-white"/>}
        color="bg-pink-600"
      />

      <Item
        title="Disk"
        value={system.disk}
        icon={<HardDrive className="text-white"/>}
        color="bg-orange-600"
      />

      <Item
        title="Containers"
        value={docker.containers}
        icon={<Boxes className="text-white"/>}
        color="bg-green-600"
      />

      <Item
        title="Images"
        value={docker.images}
        icon={<Image className="text-white"/>}
        color="bg-purple-600"
      />

      <Item
        title="Networks"
        value={docker.networks}
        icon={<Network className="text-white"/>}
        color="bg-cyan-600"
      />

    </div>

  );

}

export default SystemStatus;

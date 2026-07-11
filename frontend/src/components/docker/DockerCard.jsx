import {
  Container, Activity, Network, RotateCcw, FileText, Eye, Play, Square, Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DockerCard({ container, onDetails, onLogs, onRefresh }) {
  const running = container.status.toLowerCase().includes("up");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await fetch(`/api/docker/container/${container.name}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStats();
    const id = setInterval(loadStats, 5000);
    return () => clearInterval(id);
  }, [container.name]);

  const request = async (endpoint, method="POST", success="Done") => {
    try {
      setLoading(true);
      const res = await fetch(endpoint,{method});
      const data = await res.json();
      if(data.success){
        toast.success(success);
        loadStats();
        onRefresh && onRefresh();
      } else {
        toast.error(data.error || "Operation failed");
      }
    } catch(e){
      console.error(e);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-100 p-4 dark:bg-cyan-900/30">
            <Container className="text-cyan-600" size={28}/>
          </div>
          <div>
            <h2 className="text-xl font-bold">{container.name}</h2>
            <p className="text-sm text-slate-500">{container.image}</p>
          </div>
        </div>
        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${running?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>
          {running?"🟢 Running":"🔴 Stopped"}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3"><Activity size={18}/><span>{container.status}</span></div>
        <div className="flex items-center gap-3"><Network size={18}/><span>{container.ports || "No exposed ports"}</span></div>
      </div>

      {stats && (
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800"><p className="text-slate-500">CPU</p><p className="font-bold">{stats.cpu}</p></div>
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800"><p className="text-slate-500">Memory</p><p className="font-bold">{stats.memory}</p></div>
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800"><p className="text-slate-500">Network</p><p className="font-bold break-all">{stats.network}</p></div>
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800"><p className="text-slate-500">Block I/O</p><p className="font-bold break-all">{stats.block_io}</p></div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={()=>onDetails(container.name)} className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-white"><Eye size={18}/>Details</button>
        <button onClick={()=>onLogs(container.name)} className="rounded-xl bg-slate-700 p-3 text-white"><FileText size={18}/></button>
        <button disabled={loading} onClick={()=>request(`/api/docker/container/${container.name}/restart`,"POST","Container Restarted")} className="rounded-xl bg-orange-500 p-3 text-white"><RotateCcw size={18} className={loading?"animate-spin":""}/></button>
        {running ? (
          <button disabled={loading} onClick={()=>request(`/api/docker/container/${container.name}/stop`,"POST","Container Stopped")} className="rounded-xl bg-yellow-500 p-3 text-white"><Square size={18}/></button>
        ):(
          <button disabled={loading} onClick={()=>request(`/api/docker/container/${container.name}/start`,"POST","Container Started")} className="rounded-xl bg-green-600 p-3 text-white"><Play size={18}/></button>
        )}
        <button disabled={loading} onClick={()=>{
          if(window.confirm(`Delete ${container.name}?`)){
            request(`/api/docker/container/${container.name}`,"DELETE","Container Deleted");
          }
        }} className="rounded-xl bg-red-600 p-3 text-white"><Trash2 size={18}/></button>
      </div>
    </div>
  );
}
export default DockerCard;


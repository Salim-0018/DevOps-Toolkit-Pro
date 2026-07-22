import { useEffect, useMemo, useState } from "react";
import {
  Database,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getVolumes,
  createVolume,
  deleteVolume,
} from "../api/dockerVolumeApi";

import VolumeCard from "../components/docker-volumes/VolumeCard";

function DockerVolumes() {
  const [volumes, setVolumes] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");

  const loadVolumes = async () => {
    try {
      const data = await getVolumes();
      setVolumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load volumes");
    }
  };

  useEffect(() => {
    loadVolumes();
    const timer = setInterval(loadVolumes, 5000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    return volumes.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [volumes, search]);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Enter volume name");
      return;
    }

    const res = await createVolume(name);

    if (res.success) {
      toast.success(res.message);
      setName("");
      loadVolumes();
    } else {
      toast.error(res.error || "Failed");
    }
  };

  const handleDelete = async (volumeName) => {
    if (!window.confirm(`Delete ${volumeName}?`)) return;

    const res = await deleteVolume(volumeName);

    if (res.success) {
      toast.success(res.message);
      loadVolumes();
    } else {
      toast.error(res.error || "Delete Failed");
    }
  };

  return (
    <div className="p-8">

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black">
              Docker Volumes
            </h1>

            <p className="mt-3">
              Manage Docker Persistent Storage
            </p>
          </div>

          <button
            onClick={loadVolumes}
            className="rounded-2xl bg-white/20 p-4"
          >
            <RefreshCw />
          </button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow">
          <p>Total Volumes</p>

          <h2 className="mt-3 text-5xl font-black">
            {volumes.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p>Visible</p>

          <h2 className="mt-3 text-5xl font-black">
            {filtered.length}
          </h2>
        </div>

      </div>

      <div className="mb-8 flex gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Volume Name"
          className="flex-1 rounded-xl border p-4"
        />

        <button
          onClick={handleCreate}
          className="rounded-xl bg-cyan-600 px-8 text-white"
        >
          <Plus />
        </button>

      </div>

      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-4 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Volume..."
          className="w-full rounded-xl border py-4 pl-12"
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filtered.map((volume) => (
          <VolumeCard
            key={volume.name}
            volume={volume}
            onDelete={handleDelete}
          />
        ))}

      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center">

          <Database
            size={70}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 text-2xl font-bold">
            No Volumes Found
          </h2>

        </div>
      )}

    </div>
  );
}

export default DockerVolumes;

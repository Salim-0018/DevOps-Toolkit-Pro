import { useEffect, useMemo, useState } from "react";

import {
  Search,
  RefreshCw,
  Network,
  Globe,
  Activity,
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getNetworks,
  getNetworkSummary,
  getNetworkHealth,
  createNetwork,
  deleteNetwork,
} from "../api/dockerNetworkApi";

import NetworkCard from "../components/docker-networks/NetworkCard";

function DockerNetworks() {

  const [networks, setNetworks] = useState([]);

  const [summary, setSummary] = useState({});

  const [health, setHealth] = useState({});

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [networkName, setNetworkName] = useState("");

  const [driver, setDriver] = useState("bridge");

  const loadData = async () => {

    try {

      setLoading(true);

      const networkData = await getNetworks();

      const summaryData = await getNetworkSummary();

      const healthData = await getNetworkHealth();

      setNetworks(networkData);

      setSummary(summaryData);

      setHealth(healthData);

    } catch (err) {

      console.error(err);

      toast.error("Failed to Load Networks");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadData();

    const timer = setInterval(loadData, 5000);

    return () => clearInterval(timer);

  }, []);

  const filteredNetworks = useMemo(() => {

    return networks.filter((network) =>

      network.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      network.driver
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [networks, search]);

  const handleCreate = async () => {

    if (!networkName.trim()) {

      toast.error("Please Enter Network Name");

      return;

    }

    const res = await createNetwork(
      networkName,
      driver
    );

    if (res.success) {

      toast.success(res.message);

      setNetworkName("");

      loadData();

    } else {

      toast.error(res.error);

    }

  };

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this Docker Network?"
    );

    if (!ok) return;

    const res = await deleteNetwork(id);

    if (res.success) {

      toast.success(res.message);

      loadData();

    } else {

      toast.error(res.error);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8 dark:bg-slate-950">

        {/* ================= Hero Section ================= */}

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-cyan-100">
              DevOps Toolkit Pro
            </p>

            <h1 className="mt-2 text-5xl font-black">
              Docker Networks
            </h1>

            <p className="mt-3 max-w-2xl text-cyan-100">
              Create, manage and monitor Docker networks from a beautiful
              enterprise dashboard.
            </p>

          </div>

          <button
            onClick={loadData}
            className="rounded-2xl bg-white/20 p-4 backdrop-blur transition hover:bg-white/30"
          >
            <RefreshCw size={28} />
          </button>

        </div>

      </div>

      {/* ================= Summary Cards ================= */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Network
              size={34}
              className="text-cyan-600"
            />

            <div>

              <p className="text-slate-500">
                Total Networks
              </p>

              <h2 className="text-4xl font-bold">
                {summary.total || 0}
              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Globe
              size={34}
              className="text-blue-600"
            />

            <div>

              <p className="text-slate-500">
                Bridge Networks
              </p>

              <h2 className="text-4xl font-bold">
                {summary.bridge || 0}
              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Activity
              size={34}
              className="text-green-600"
            />

            <div>

              <p className="text-slate-500">
                Docker Status
              </p>

              <h2 className="text-xl font-bold text-green-600">
                {health.dockerRunning ? "ONLINE" : "OFFLINE"}
              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Network
              size={34}
              className="text-purple-600"
            />

            <div>

              <p className="text-slate-500">
                Overlay Networks
              </p>

              <h2 className="text-4xl font-bold">
                {summary.overlay || 0}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Create Network ================= */}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

        <h2 className="mb-6 text-2xl font-bold">
          Create Docker Network
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <input
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            placeholder="Network Name"
            className="rounded-xl border p-3 dark:bg-slate-800"
          />

          <select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="rounded-xl border p-3 dark:bg-slate-800"
          >
            <option value="bridge">bridge</option>
            <option value="host">host</option>
            <option value="overlay">overlay</option>
            <option value="macvlan">macvlan</option>
          </select>

          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 p-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            <Plus size={18} />
            Create Network
          </button>

        </div>

      </div>

          {/* ================= Search ================= */}

      <div className="relative mb-8">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Docker Networks..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 shadow focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

      </div>

      {/* ================= Loading ================= */}

      {loading ? (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {[1, 2, 3, 4, 5, 6].map((item) => (

            <div
              key={item}
              className="h-64 animate-pulse rounded-3xl bg-slate-300 dark:bg-slate-800"
            />

          ))}

        </div>

      ) : (

        <>
          {/* ================= Network Grid ================= */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredNetworks.length === 0 ? (

              <div className="col-span-full rounded-3xl bg-white p-12 text-center shadow-xl dark:bg-slate-900">

                <Network
                  size={60}
                  className="mx-auto mb-4 text-slate-400"
                />

                <h2 className="text-2xl font-bold">
                  No Docker Networks Found
                </h2>

                <p className="mt-2 text-slate-500">
                  Create a new Docker network or change your search.
                </p>

              </div>

            ) : (

              filteredNetworks.map((network) => (

                <NetworkCard
                  key={network.id}
                  network={network}
                  onDelete={handleDelete}
                />

              ))

            )}

          </div>
                 {/* ================= Footer Dashboard ================= */}

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">

            <div className="grid gap-6 md:grid-cols-4">

              <div>

                <p className="text-sm text-slate-500">
                  Total Networks
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {summary.total || 0}
                </h2>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Bridge Networks
                </p>

                <h2 className="mt-2 text-3xl font-bold text-cyan-600">
                  {summary.bridge || 0}
                </h2>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Docker Engine
                </p>

                <h2 className="mt-2 text-2xl font-bold text-green-600">
                  {health.dockerRunning ? "Healthy ✅" : "Offline ❌"}
                </h2>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Last Refresh
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {new Date().toLocaleTimeString()}
                </h2>

              </div>

            </div>

          </div>

        </>
      )}

    </div>

  );

}

export default DockerNetworks;

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Package,
  Play,
  Square,
  RotateCcw,
  Trash2,
  Activity,
  Cpu,
  MemoryStick,
} from "lucide-react";

import {
  getContainers,
  startContainer,
  stopContainer,
  restartContainer,
  deleteContainer,
} from "../api/dockerApi";

import { Link } from "react-router-dom";

function DockerContainers() {

  const [containers, setContainers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const loadContainers = async () => {

    try {

      setLoading(true);

      const data = await getContainers();

      setContainers(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadContainers();

    const timer = setInterval(() => {

      loadContainers();

    }, 5000);

    return () => clearInterval(timer);

  }, []);

  const filteredContainers = useMemo(() => {

    return containers.filter((container) => {

      const searchMatch =
        container.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        container.image
          .toLowerCase()
          .includes(search.toLowerCase());

      if (statusFilter === "running")
        return searchMatch && container.running;

      if (statusFilter === "stopped")
        return searchMatch && !container.running;

      return searchMatch;

    });

  }, [containers, search, statusFilter]);

  const runningCount = containers.filter(
    (c) => c.running
  ).length;

  const stoppedCount =
    containers.length - runningCount;

  const handleStart = async (name) => {

    await startContainer(name);

    loadContainers();

  };

  const handleStop = async (name) => {

    await stopContainer(name);

    loadContainers();

  };

  const handleRestart = async (name) => {

    await restartContainer(name);

    loadContainers();

  };

  const handleDelete = async (name) => {

    const ok = window.confirm(

      `Delete container "${name}" ?`

    );

    if (!ok) return;

    await deleteContainer(name);

    loadContainers();

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8 dark:bg-slate-950">

      {/* Hero Section */}

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-cyan-100">

              DevOps Toolkit Pro

            </p>

            <h1 className="mt-2 text-5xl font-black">

              Docker Containers

            </h1>

            <p className="mt-3 max-w-2xl text-cyan-100">

              Monitor, manage and control all Docker
              containers from one professional dashboard.

            </p>

          </div>

          <button

            onClick={loadContainers}

            className="rounded-2xl bg-white/20 p-4 backdrop-blur transition hover:bg-white/30"

          >

            <RefreshCw size={28} />

          </button>

        </div>

      </div>
     
            {/* Summary Cards */}

      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Package
              className="text-cyan-600"
              size={34}
            />

            <div>

              <p className="text-slate-500">
                Total Containers
              </p>

              <h2 className="text-4xl font-bold">
                {containers.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Activity
              className="text-green-600"
              size={34}
            />

            <div>

              <p className="text-slate-500">
                Running
              </p>

              <h2 className="text-4xl font-bold text-green-600">
                {runningCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex items-center gap-4">

            <Square
              className="text-red-500"
              size={34}
            />

            <div>

              <p className="text-slate-500">
                Stopped
              </p>

              <h2 className="text-4xl font-bold text-red-500">
                {stoppedCount}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Container..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 shadow dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-2xl border border-slate-200 bg-white px-6 shadow dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >

          <option value="all">
            All Containers
          </option>

          <option value="running">
            Running
          </option>

          <option value="stopped">
            Stopped
          </option>

        </select>

      </div>

      {/* Loading */}

      {loading && (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {[1,2,3,4,5,6].map((item)=>(

            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl bg-white shadow-lg dark:bg-slate-900"
            />

          ))}

        </div>

      )}

      {!loading && (

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredContainers.length === 0 ? (

            <div className="col-span-full rounded-2xl bg-white p-16 text-center shadow-lg dark:bg-slate-900">

              <Package
                size={60}
                className="mx-auto mb-6 text-slate-400"
              />

              <h2 className="text-3xl font-bold">
                No Containers Found
              </h2>

              <p className="mt-2 text-slate-500">
                Try another search or filter.
              </p>

            </div>

          ) : (

            filteredContainers.map((container) => (

              <div
                key={container.name}
                className="rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900"
              >

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold break-all">
                      {container.name}
                    </h2>

                    <p className="mt-1 text-slate-500 break-all">
                      {container.image}
                    </p>

                  </div>

                  {container.running ? (

                    <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
                      RUNNING
                    </span>

                  ) : (

                    <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                      STOPPED
                    </span>

                  )}

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

                    <Cpu
                      size={18}
                      className="mb-2 text-cyan-600"
                    />

                    <p className="text-xs text-slate-500">
                      Platform
                    </p>

                    <h3 className="font-bold">
                      {container.platform}
                    </h3>

                  </div>

                  <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

                    <MemoryStick
                      size={18}
                      className="mb-2 text-indigo-600"
                    />

                    <p className="text-xs text-slate-500">
                      Restart Count
                    </p>

                    <h3 className="font-bold">
                      {container.restartCount}
                    </h3>

                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    onClick={() => handleStart(container.name)}
                    className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    <Play size={16} />
                  </button>

                  <button
                    onClick={() => handleStop(container.name)}
                    className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    <Square size={16} />
                  </button>

                  <button
                    onClick={() => handleRestart(container.name)}
                    className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(container.name)}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-black"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link
                    to={`/docker-container/${container.name}`}
                    className="ml-auto rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700"
                  >
                    Details
                  </Link>

                </div>

              </div>

            ))

          )}

        </div>

              )}

      {/* Footer */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <div className="grid gap-6 md:grid-cols-4">

          <div>

            <p className="text-sm text-slate-500">
              Total
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {containers.length}
            </h2>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Running
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {runningCount}
            </h2>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Stopped
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {stoppedCount}
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

    </div>

  
  );
}

export default DockerContainers;

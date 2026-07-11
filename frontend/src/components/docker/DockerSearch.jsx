import { Search } from "lucide-react";

function DockerSearch({ search, setSearch }) {
  return (
    <div className="relative w-full">

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Containers..."
        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 shadow-sm transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />

    </div>
  );
}

export default DockerSearch;

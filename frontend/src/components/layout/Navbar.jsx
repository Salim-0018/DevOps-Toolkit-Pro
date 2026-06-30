function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <h2 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-slate-100 px-4 py-2 hover:bg-slate-200">
          🔔 Notifications
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            S
          </div>

          <span className="font-medium text-gray-700">
            Salim
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

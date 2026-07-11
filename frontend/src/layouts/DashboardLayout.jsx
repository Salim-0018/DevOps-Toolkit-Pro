import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-1 flex-col">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}

export default DashboardLayout;

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex flex-col items-center justify-between gap-2 text-sm text-slate-500 md:flex-row">

        <p>
          © {new Date().getFullYear()} DevOps Toolkit Pro
        </p>

        <p>
          Built with ❤️ using React, FastAPI & Docker
        </p>

      </div>

    </footer>
  );
}

export default Footer;

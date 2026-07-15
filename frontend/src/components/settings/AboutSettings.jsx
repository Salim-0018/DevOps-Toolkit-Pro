function AboutSettings() {
  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold text-white">
          About DevOps Toolkit Pro
        </h2>

        <p className="mt-2 text-slate-400">
          Enterprise DevOps Management Platform
        </p>

      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

        <table className="w-full text-left text-slate-300">

          <tbody>

            <tr>
              <td className="py-2 font-semibold">Version</td>
              <td>2.0.0</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Developer</td>
              <td>Salim Khan</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Frontend</td>
              <td>React + Tailwind CSS</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Backend</td>
              <td>Node.js + Express</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Database</td>
              <td>MongoDB (Planned)</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">License</td>
              <td>MIT</td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="rounded-xl bg-cyan-600 p-5 text-white">

        <h3 className="text-xl font-bold">
          DevOps Toolkit Pro
        </h3>

        <p className="mt-2">
          One Platform for Docker, Kubernetes, Jenkins,
          Monitoring, AWS and DevOps Automation.
        </p>

      </div>

    </div>
  );
}

export default AboutSettings;

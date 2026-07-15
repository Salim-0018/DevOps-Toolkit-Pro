import { useState } from "react";

function IntegrationSettings() {

  const [config, setConfig] = useState({
    docker: "unix:///var/run/docker.sock",
    kubernetes: "~/.kube/config",
    jenkins: "http://localhost:8081",
    prometheus: "http://localhost:9090",
  });

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-white">
          Integrations
        </h2>

        <p className="mt-2 text-slate-400">
          Configure service endpoints.
        </p>
      </div>

      {Object.keys(config).map((item) => (

        <div key={item}>

          <label className="mb-2 block text-white capitalize">
            {item}
          </label>

          <input
            type="text"
            name={item}
            value={config[item]}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />

        </div>

      ))}

    </div>
  );
}

export default IntegrationSettings;

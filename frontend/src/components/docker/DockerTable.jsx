import { useEffect, useMemo, useState } from "react";
import DockerLogsModal from "./DockerLogsModal";
import DockerHeader from "./DockerHeader";
import DockerSearch from "./DockerSearch";
import DockerStats from "./DockerStats";
import DockerCard from "./DockerCard";
import DockerDetailsModal from "./DockerDetailsModal";

function DockerTable() {

  const [containers, setContainers] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);

  const [logsOpen, setLogsOpen] = useState(false);
  const [logs, setLogs] = useState("");
  const [logContainer, setLogContainer] = useState("");

  const loadContainers = () => {
    fetch("/api/docker/containers")
      .then((res) => res.json())
      .then((data) => {
        setContainers(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  };

  const handleDetails = async (containerName) => {
    try {
      const res = await fetch(
        `/api/docker/container/${containerName}`
      );

      const data = await res.json();

      setSelectedContainer(data);
      setModalOpen(true);

    } catch (err) {
      console.error(err);
    }
  };


 const handleLogs = async (containerName) => {
  try {
    const res = await fetch(
      `/api/docker/container/${containerName}/logs`
    );

    const data = await res.json();

    setLogs(data.logs || "");
    setLogContainer(containerName);
    setLogsOpen(true);

  } catch (err) {
    console.error(err);
  }
};  


  useEffect(() => {

    loadContainers();

    const interval = setInterval(loadContainers, 5000);

    return () => clearInterval(interval);

  }, []);

  const filteredContainers = useMemo(() => {

    return containers.filter((container) =>
      container.name.toLowerCase().includes(search.toLowerCase()) ||
      container.image.toLowerCase().includes(search.toLowerCase())
    );

  }, [containers, search]);

  return (

    <div className="mt-10">

      <DockerHeader total={containers.length} />

      <DockerSearch
        search={search}
        setSearch={setSearch}
      />

      <div className="mt-8">

        <DockerStats containers={containers} />

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredContainers.map((container) => (
          <DockerCard
            key={container.name}
            container={container}
            onDetails={handleDetails}
            onLogs={handleLogs}
          />
        ))}

      </div>

      <DockerDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        container={selectedContainer}
      />
      
      <DockerLogsModal
        open={logsOpen}
        onClose={() => setLogsOpen(false)}
        logs={logs}
        containerName={logContainer}
       />


    </div>

  );
}

export default DockerTable;

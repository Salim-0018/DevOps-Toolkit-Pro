import ResourceChart from "./ResourceChart";

function MonitoringCharts({ monitoring }) {

  return (

    <div className="grid gap-6 xl:grid-cols-2">

      <ResourceChart
        title="CPU Usage"
        value={monitoring.cpu}
        color="cyan"
      />

      <ResourceChart
        title="Memory Usage"
        value={monitoring.memory}
        color="violet"
      />

    </div>

  );

}

export default MonitoringCharts;

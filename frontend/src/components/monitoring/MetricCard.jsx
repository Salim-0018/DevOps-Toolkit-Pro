import Card from "../ui/Card";

function MetricCard({
  title,
  value,
  subtitle,
  icon,
}) {

  return (

    <Card className="p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          <p className="mt-2 text-emerald-400">
            {subtitle}
          </p>

        </div>

        <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">

          {icon}

        </div>

      </div>

    </Card>

  );
}

export default MetricCard;

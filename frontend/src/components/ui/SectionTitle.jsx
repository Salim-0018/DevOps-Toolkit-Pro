function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;

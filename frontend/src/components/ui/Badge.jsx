function Badge({
  text,
  color = "green",
}) {
  const colors = {
    green:
      "bg-emerald-500/20 text-emerald-400",

    red:
      "bg-red-500/20 text-red-400",

    yellow:
      "bg-yellow-500/20 text-yellow-400",

    blue:
      "bg-cyan-500/20 text-cyan-400",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${colors[color]}
      `}
    >
      {text}
    </span>
  );
}

export default Badge;

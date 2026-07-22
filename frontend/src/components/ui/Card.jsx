function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
      rounded-2xl
      border
      border-slate-800
      bg-[#111827]
      shadow-xl
      transition-all
      duration-300
      ${
        hover
          ? "hover:border-cyan-500/40 hover:shadow-cyan-500/10 hover:-translate-y-1"
          : ""
      }
      ${className}
    `}
    >
      {children}
    </div>
  );
}

export default Card;

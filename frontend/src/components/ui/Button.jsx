function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const styles = {
    primary:
      "bg-cyan-600 hover:bg-cyan-500 text-white",

    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",

    success:
      "bg-emerald-600 hover:bg-emerald-500 text-white",

    danger:
      "bg-red-600 hover:bg-red-500 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        duration-300
        shadow-lg
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;

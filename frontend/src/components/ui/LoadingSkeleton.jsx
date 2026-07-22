function LoadingSkeleton({
  className = "",
}) {
  return (
    <div
      className={`
      animate-pulse
      rounded-xl
      bg-slate-800
      ${className}
      `}
    />
  );
}

export default LoadingSkeleton;

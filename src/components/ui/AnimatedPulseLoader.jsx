export function AnimatedPulseLoader({
  className = "",
  size,
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    full: "h-full w-full",
  };

  const dimensions = size ? sizeClasses[size] : "";

  return (
    <div
      className={`${dimensions} ${className} animate-pulse-slow bg-zinc-800`}
    />
  );
}
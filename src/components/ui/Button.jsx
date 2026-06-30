import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  const variants = {
    primary:
      "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40",

    outline:
      "border border-zinc-700 bg-transparent text-white hover:border-yellow-400 hover:text-yellow-400",

    ghost:
      "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800",

    dark:
      "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800",

    danger:
      "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {isLoading && <Loader2 className="animate-spin" size={18} />}
      {children}
    </button>
  );
}
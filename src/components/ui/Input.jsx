import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  type = "text",
  label,
  error,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-[11px] uppercase tracking-[0.18em] font-bold text-zinc-500">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`
            w-full
            h-12
            rounded-xl
            bg-zinc-900
            border
            px-4
            text-sm
            text-white
            placeholder:text-zinc-500
            transition-all
            duration-300
            outline-none
            ${
              error
                ? "border-red-500"
                : "border-zinc-700 focus:border-yellow-400"
            }
            ${isPassword ? "pr-12" : ""}
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
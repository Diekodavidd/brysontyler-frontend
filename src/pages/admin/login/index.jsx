import { useState } from "react";
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useAdminLogin();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(form, {
      onSuccess: () => {
        navigate("/admin");
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d4af3720,transparent_55%)]" />

      <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-[#090909]/95 backdrop-blur-xl p-10">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="h-20 w-20 rounded-full bg-amber-500/10 flex items-center justify-center">

            <ShieldCheck
              size={38}
              className="text-amber-500"
            />

          </div>

        </div>

        <div className="mt-8 text-center">

          <p className="uppercase tracking-[.35em] text-xs text-amber-500 font-black">

            Bryson Tyler

          </p>

          <h1 className="mt-3 text-4xl font-black">

            Admin Portal

          </h1>

          <p className="mt-3 text-zinc-500">

            Sign in to manage creators, memberships,
            gallery and platform settings.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">

              Email Address

            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="admin@brysontyler.com"
                className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 outline-none focus:border-amber-500"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">

              Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-12 pr-14 outline-none focus:border-amber-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <button
            disabled={isPending}
            className="w-full rounded-2xl bg-amber-500 py-4 text-lg font-black text-black transition hover:bg-amber-400 disabled:opacity-60"
          >
            {isPending
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">

          <p className="text-xs tracking-[.25em] uppercase text-zinc-600">

            Bryson Tyler Admin Dashboard

          </p>

        </div>

      </div>

    </div>
  );
}
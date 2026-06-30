import { Outlet } from "react-router-dom";
import { useRouter } from "../compat/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,.65)]">
          {/* Navigation */}
          <div className="mb-10 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-yellow-400/40 hover:text-yellow-400"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => router.push("/home")}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 transition hover:border-yellow-400/40 hover:text-yellow-400"
            >
              <Home size={14} />
              Home
            </button>
          </div>

          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 text-2xl font-black text-black shadow-[0_0_35px_rgba(250,204,21,.35)]">
              BT
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white">
              BRYSON TYLER
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Premium creator platform
            </p>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
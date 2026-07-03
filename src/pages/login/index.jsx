import { useState } from "react";
import Link from "@/compat/Link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Apple,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useSignIn } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { mutateAsync, isPending } = useSignIn();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
  try {
    console.log("Submitting login...");

    const result = await mutateAsync(data);

    console.log("RESULT:", result);

    console.log("Finished");
  } catch (e) {
    console.error("LOGIN FAILED", e);
  }
};

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-black uppercase tracking-[0.2em]">
          <ShieldCheck size={14} />
          Secure Login
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight">
          Welcome Back
        </h1>

        <p className="mt-3 text-zinc-400 max-w-sm mx-auto">
          Sign in to continue watching exclusive videos,
          livestreams and your favorite creators.
        </p>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="h-14 rounded-2xl border border-white/10 bg-zinc-900 hover:border-white/30 transition-all flex items-center justify-center gap-3 font-semibold"
        >
          <ShieldCheck size={20} />
          Google
        </button>

        <button
          type="button"
          className="h-14 rounded-2xl border border-white/10 bg-zinc-900 hover:border-white/30 transition-all flex items-center justify-center gap-3 font-semibold"
        >
          <Apple size={20} />
          Apple
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-[#090909] px-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
            OR
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <Input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="pl-12"
            error={errors.email?.message}
          />
        </div>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pl-12 pr-12"
            error={errors.password?.message}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-zinc-500 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-yellow-500"
            />

            <span className="text-zinc-400">
              Remember Me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full h-14 text-lg"
        >
          {isPending ? "Signing In..." : "Login"}
        </Button>
      </form>

      <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-5">
        <div className="flex gap-3">
          <ShieldCheck
            className="text-green-400 mt-1"
            size={18}
          />

          <div>
            <h4 className="font-bold">
              Safe & Encrypted
            </h4>

            <p className="text-sm text-zinc-400 mt-1">
              Your account is protected with secure authentication
              and encrypted sessions.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-yellow-400 hover:text-yellow-300"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
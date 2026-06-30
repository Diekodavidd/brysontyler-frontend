import { useState } from "react";
import { useSearchParams, useRouter } from "@/compat/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "@/compat/Link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useSignUp } from "@/hooks/useAuth";

import { useEffect } from "react";



const fanSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  role: z.enum(["fan", "creator"]),
});

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role") || "fan";

  const { mutateAsync, isPending } = useSignUp();

  useEffect(() => {
  console.log("Signup mounted");

  return () => console.log("Signup unmounted");
}, []);

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fanSchema),
    defaultValues: {
      role,
    },
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);

    if (role === "creator") {
      router.push("/CreatorProfilePage");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
          {role === "creator" ? (
            <>
              <Sparkles size={14} />
              Creator Application
            </>
          ) : (
            <>
              <ShieldCheck size={14} />
              Fan Membership
            </>
          )}
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight">
          {role === "creator"
            ? "Become a Creator"
            : "Create Your Account"}
        </h1>

        <p className="mt-3 text-zinc-400">
          {role === "creator"
            ? "Build your audience, earn subscriptions and go live."
            : "Join thousands of fans enjoying exclusive content."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <input
          type="hidden"
          {...register("role")}
        />

        <div className="relative">
          <User
            className="absolute left-4 top-4 text-zinc-500"
            size={18}
          />

          <Input
            {...register("name")}
            placeholder="Full Name"
            className="pl-12"
            error={errors.name?.message}
          />
        </div>

        <div className="relative">
          <Mail
            className="absolute left-4 top-4 text-zinc-500"
            size={18}
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
            className="absolute left-4 top-4 text-zinc-500"
            size={18}
          />

          <Input
            {...register("password")}
            type={
              showPassword ? "text" : "password"
            }
            placeholder="Password"
            className="pl-12 pr-12"
            error={errors.password?.message}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4 text-zinc-500 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="h-14 w-full text-lg"
        >
          {isPending
            ? "Creating Account..."
            : role === "creator"
            ? "Apply as Creator"
            : "Create Account"}
        </Button>
      </form>

      <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck
            className="mt-1 text-green-400"
            size={18}
          />

          <div>
            <h4 className="font-bold">
              Your information is secure
            </h4>

            <p className="mt-1 text-sm text-zinc-400">
              Email verification, encrypted
              passwords, secure payments and
              complete privacy.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-yellow-400 hover:text-yellow-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
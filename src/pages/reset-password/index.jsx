import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "@/compat/navigation";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useResetPassword } from "@/hooks/useAuth";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token;

  const {
    mutate: resetPassword,
    isPending,
  } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    if (!token) return;

    resetPassword({
      token,
      password: data.password,
    });
  };

  return (
    <div className="relative">
      <div className="absolute left-1/2 -top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-[0_0_60px_rgba(0,0,0,.45)] backdrop-blur-2xl md:p-10">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(234,179,8,.35)]">
            <Lock
              size={34}
              className="text-black"
            />
          </div>
        </div>

        <div className="mb-8 space-y-3 text-center">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Create New Password
          </h1>

          <p className="mx-auto max-w-md text-zinc-400">
            Your new password should be unique and
            different from previously used passwords.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            {...register("password")}
            type="password"
            placeholder="New Password"
            error={errors.password?.message}
          />

          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm New Password"
            error={errors.confirmPassword?.message}
          />

          <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-4">
              <ShieldCheck
                className="mx-auto mb-2 text-green-400"
                size={20}
              />

              <p className="text-xs text-zinc-300">
                Secure Encryption
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-4">
              <CheckCircle2
                className="mx-auto mb-2 text-yellow-400"
                size={20}
              />

              <p className="text-xs text-zinc-300">
                Instant Update
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-4">
              <Lock
                className="mx-auto mb-2 text-blue-400"
                size={20}
              />

              <p className="text-xs text-zinc-300">
                Protected Account
              </p>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending || !token}
            className="w-full"
          >
            {isPending
              ? "UPDATING PASSWORD..."
              : "RESET PASSWORD"}
          </Button>

          {!token && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center">
              <p className="text-sm font-medium text-red-400">
                Invalid or expired reset link.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
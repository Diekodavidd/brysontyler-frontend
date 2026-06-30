import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "@/compat/Link";
import { useForgotPassword } from "@/hooks/useAuth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    forgotPassword(data, {
      onSuccess: () => {
        setSent(true);
      },
    });
  };

  if (sent) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
          <CheckCircle2
            size={38}
            className="text-green-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-black">
            Check Your Email
          </h2>

          <p className="mt-3 leading-7 text-zinc-400">
            If an account exists with that email address,
            we've sent a password reset link.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-block font-bold text-yellow-400 hover:text-yellow-300"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10">
          <Mail
            size={36}
            className="text-yellow-400"
          />
        </div>

        <h2 className="text-3xl font-black">
          Forgot Password
        </h2>

        <p className="mt-3 leading-7 text-zinc-400">
          Enter your email address and we'll send you a
          secure password reset link.
        </p>
      </div>

      <Input
        {...register("email")}
        type="email"
        placeholder="Email Address"
        error={errors.email?.message}
      />

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
        <div className="flex gap-3">
          <ShieldCheck
            size={18}
            className="mt-1 shrink-0 text-yellow-400"
          />

          <p className="text-sm leading-6 text-zinc-400">
            For your security, password reset links expire
            after a short period of time.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isPending}
        disabled={isPending}
        className="h-14 w-full"
      >
        {isPending
          ? "SENDING RESET LINK..."
          : "SEND RESET LINK"}
      </Button>

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-zinc-500 transition-colors hover:text-white"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
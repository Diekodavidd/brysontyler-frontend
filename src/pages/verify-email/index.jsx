import Link from "@/compat/Link";
import { useEffect, useState } from "react";
import {
  MailCheck,
  RefreshCcw,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

import Button from "@/components/ui/Button";

export default function VerifyEmailPage() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div className="w-full">
      <div className="space-y-8 text-center">
        <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-yellow-500/10" />

          <div className="absolute inset-4 rounded-full border border-yellow-500/20" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-[0_0_60px_rgba(250,204,21,.35)]">
            <MailCheck
              size={44}
              className="text-black"
            />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-black">
            Verify Your Email
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-7 text-zinc-400">
            We've sent a verification email to your
            inbox. Click the link inside the email to
            activate your account and continue your
            experience.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="text-green-400" />

            <span className="font-semibold">
              Email successfully sent
            </span>
          </div>

          <p className="mt-3 text-sm text-zinc-500">
            If you don't see it, check your Spam or
            Promotions folder.
          </p>
        </div>

        <div className="space-y-4">
          <Button className="h-14 w-full">
            I've Verified My Email
          </Button>

          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <button className="h-14 w-full rounded-2xl border border-white/10 bg-zinc-900 transition hover:border-yellow-400">
              Open Gmail
            </button>
          </a>

          <a
            href="https://outlook.live.com/mail"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <button className="h-14 w-full rounded-2xl border border-white/10 bg-zinc-900 transition hover:border-yellow-400">
              Open Outlook
            </button>
          </a>
        </div>

        <div className="pt-2">
          {seconds > 0 ? (
            <p className="text-sm text-zinc-500">
              Resend available in{" "}
              <span className="font-bold text-yellow-400">
                {seconds}s
              </span>
            </p>
          ) : (
            <button className="mx-auto flex items-center justify-center gap-2 font-semibold text-yellow-400 hover:text-yellow-300">
              <RefreshCcw size={16} />
              Resend Verification Email
            </button>
          )}
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
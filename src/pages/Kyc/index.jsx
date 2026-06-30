import { ShieldCheck, ArrowRight, BadgeCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useStartKYC } from "@/hooks/useAuth";

export default function KYCPage() {
  const { mutate, isPending } = useStartKYC();

  const handleStart = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        if (data?.verificationUrl) {
          window.location.href = data.verificationUrl;
        }
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
          <ShieldCheck className="w-12 h-12 text-yellow-400" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Verify Your Identity
        </h1>

        <p className="text-zinc-400 leading-7">
          Before becoming a verified creator, we need to confirm your identity.
          This helps protect creators, fans and the platform.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex gap-3">
          <BadgeCheck className="text-green-400 mt-1" />
          <div>
            <h3 className="font-bold">Government ID</h3>
            <p className="text-sm text-zinc-500">
              Passport, Driver&apos;s License or National ID.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <BadgeCheck className="text-green-400 mt-1" />
          <div>
            <h3 className="font-bold">Selfie Verification</h3>
            <p className="text-sm text-zinc-500">
              Live facial verification powered by Didit.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <BadgeCheck className="text-green-400 mt-1" />
          <div>
            <h3 className="font-bold">2 Minutes</h3>
            <p className="text-sm text-zinc-500">
              Most creators finish verification in under two minutes.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleStart}
        isLoading={isPending}
        className="w-full"
      >
        {isPending ? (
          "STARTING..."
        ) : (
          <span className="flex items-center justify-center gap-2">
            Verify with Didit
            <ArrowRight size={18} />
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-zinc-500">
        Your identity information is encrypted and securely processed by Didit.
      </p>
    </div>
  );
}
import { useRouter } from "@/compat/navigation";
import {
  Clock3,
  CheckCircle2,
  Home,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function CreatorPendingPage() {
  const router = useRouter();

  return (
    <div className="space-y-10 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
        <Clock3 className="h-12 w-12 text-yellow-400" />
      </div>

      <div>
        <h1 className="text-4xl font-black uppercase">
You're Almost Ready!
        </h1>

        <p className="mt-4 text-zinc-400 leading-7">
          Your creator profile has been successfully submitted.
          Our moderation team is now reviewing your account.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 space-y-5 text-left">
        <div className="flex gap-3">
          <CheckCircle2 className="text-green-400 mt-1" />
          <p className="text-zinc-300">
            Identity verification completed.
          </p>
        </div>

        <div className="flex gap-3">
          <CheckCircle2 className="text-green-400 mt-1" />
          <p className="text-zinc-300">
            Creator information received.
          </p>
        </div>

        <div className="flex gap-3">
          <Clock3 className="text-yellow-400 mt-1" />
          <p className="text-zinc-300">
            Estimated review time:
            <strong className="ml-1 text-white">
              24 - 48 Hours
            </strong>
          </p>
      
 
        </div>
        
      </div>
       <p className="text-zinc-300">
    You can continue exploring your creator dashboard while we review your application.
    Publishing premium content and receiving subscriptions will become available once your account has been approved.
  </p>

     <Button
  className="w-full"
  onClick={() => router.push("/dashboard")}
>
  <span className="flex items-center justify-center gap-2">
    <Home size={18} />
    Continue to Dashboard
  </span>
</Button>
    </div>
  );
}
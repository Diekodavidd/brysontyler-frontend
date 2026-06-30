import { useEffect } from "react";
import { useRouter } from "@/compat/navigation";

export default function KYCCompletePage() {
  const router = useRouter();

  useEffect(() => {
    // Later you can call GET /kyc/status here
    router.replace("/CreatorVerification");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Redirecting...
    </div>
  );
}
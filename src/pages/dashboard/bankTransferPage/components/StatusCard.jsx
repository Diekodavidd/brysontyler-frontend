import {
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";

export default function StatusCard({ payment }) {
  const status = payment.paymentStatus;

  let color =
    "bg-yellow-500/10 text-yellow-400";

  let icon = <Clock3 size={18} />;

  if (status === "approved") {
    color =
      "bg-green-500/10 text-green-400";

    icon = <CheckCircle2 size={18} />;
  }

  if (status === "rejected") {
    color =
      "bg-red-500/10 text-red-400";

    icon = <AlertCircle size={18} />;
  }

  return (
    <div className={`rounded-2xl p-5 ${color}`}>
      <div className="flex items-center gap-3">
        {icon}

        <span className="font-black uppercase">
          {status.replaceAll("_", " ")}
        </span>
      </div>

      {payment.rejectionReason && (
        <div className="mt-4 text-sm">
          <strong>Reason:</strong>{" "}
          {payment.rejectionReason}
        </div>
      )}
    </div>
  );
}
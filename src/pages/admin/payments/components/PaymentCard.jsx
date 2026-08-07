import {
  User,
  CalendarDays,
  CreditCard,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function PaymentCard({
  payment,
  onView,
  onApprove,
  onReject,
  approving,
  rejecting,
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-900 overflow-hidden">

      <div className="h-72 bg-black">
        {payment.bankTransfer?.receiptUrl ? (
          <img
            src={payment.bankTransfer.receiptUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            No Receipt Uploaded
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">

        <div className="flex justify-between">

          <div>
            <h2 className="font-black text-xl">
              {payment.membershipPlan}
            </h2>

            <p className="text-pink-500 font-semibold">
              ${payment.amount}
            </p>
          </div>

          <span className="rounded-full bg-yellow-500/15 text-yellow-400 px-4 py-2 text-xs uppercase font-bold h-fit">
            {payment.paymentStatus.replaceAll("_", " ")}
          </span>

        </div>

        <div className="space-y-3 text-sm">

          <div className="flex gap-3 items-center">
            <User size={16} className="text-pink-500" />

            <div>
              <p>{payment.userId?.name}</p>

              <p className="text-zinc-500">
                {payment.userId?.email}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <CreditCard
              size={16}
              className="text-pink-500"
            />

            <span>
              {payment.bankTransfer?.accountNumber}
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <CalendarDays
              size={16}
              className="text-pink-500"
            />

            <span>
              {new Date(
                payment.createdAt
              ).toLocaleString()}
            </span>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => onView(payment)}
            className="h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            View
          </button>

          <button
            disabled={approving}
            onClick={() => onApprove(payment)}
            className="h-11 rounded-xl bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} />
            Approve
          </button>

          <button
            disabled={rejecting}
            onClick={() => onReject(payment)}
            className="h-11 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <XCircle size={18} />
            Reject
          </button>

        </div>

      </div>
    </div>
  );
}
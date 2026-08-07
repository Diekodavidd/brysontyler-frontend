import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Copy,
  CheckCircle2,
  Clock3,
  Upload,
  Loader2,
  ShieldCheck,
  Receipt,
  AlertCircle,
} from "lucide-react";

import { httpGet } from "@/lib/http";
import { useUploadBankReceipt } from "@/hooks/useFan";

import InfoCard from "./components/InfoCard";
import StatusCard from "./components/StatusCard";
import ReceiptUploadCard from "./components/UploadReceiptPage";

export default function BankTransferPaymentPage() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const {
    mutate: uploadReceipt,
    isPending: uploading,
  } = useUploadBankReceipt();

  const {
    data: payment,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      const res = await httpGet(`/payments/${paymentId}`);
      return res.payment;
    },
    refetchInterval: 10000,
  });

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

 

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error.message}
      </div>
    );
  }

  if (!payment) {
    return (
      <div>No payment found.</div>
    );
  }

  const uploaded =
    payment.receiptImage ||
    payment.receiptUrl;

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <section className="rounded-3xl border border-pink-500/20 bg-zinc-900 p-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="uppercase tracking-[.35em] text-pink-500 text-xs font-black">
              BANK TRANSFER
            </p>

            <h1 className="text-4xl font-black mt-3">
              {payment.membershipPlan ||
                "Membership"}
            </h1>

            <p className="text-zinc-500 mt-2">
              Complete your transfer then upload
              your payment receipt.
            </p>

          </div>

          <button
            onClick={refetch}
            className="rounded-xl bg-zinc-800 px-5 py-3"
          >
            Refresh
          </button>

        </div>

      </section>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT */}

        <div className="space-y-6">

          <InfoCard
            icon={<Building2 />}
            title="Account Name"
            value={payment.bankAccountName}
          />

          <InfoCard
            icon={<Building2 />}
            title="Bank"
            value={payment.bankName}
          />

          <InfoCard
            icon={<CreditCard />}
            title="Account Number"
            value={payment.bankAccountNumber}
            copy
          />

          <InfoCard
            icon={<Receipt />}
            title="Reference"
            value={payment.reference}
            copy
          />

          <InfoCard
            icon={<ShieldCheck />}
            title="Membership"
            value={payment.membershipPlan}
          />

          <InfoCard
            icon={<CheckCircle2 />}
            title="Amount"
            value={`$${payment.amount}`}
          />

          <StatusCard payment={payment} />

        </div>

        {/* RIGHT */}

       <ReceiptUploadCard
    paymentId={payment._id}
    status={payment.paymentStatus}
    isUploading={uploading}
    onUpload={(data) =>
        uploadReceipt(data, {
            onSuccess: () => {
                refetch();
            },
        })
    }
/>

      </div>

      <section className="rounded-3xl border border-pink-500/20 bg-pink-500/10 p-8">

        <h2 className="font-black text-xl">
          Payment Instructions
        </h2>

        <ul className="space-y-4 mt-6 text-zinc-300">

          <li>
            • Transfer the exact amount shown
            above.
          </li>

          <li>
            • Use the payment reference when
            making the transfer.
          </li>

          <li>
            • Upload a clear screenshot or
            receipt after payment.
          </li>

          <li>
            • Your membership activates once
            the admin approves your receipt.
          </li>

        </ul>

      </section>

    </div>
  );
}

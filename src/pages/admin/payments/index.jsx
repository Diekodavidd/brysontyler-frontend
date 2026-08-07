import { useState } from "react";
import {
  Loader2,
  RefreshCcw,
} from "lucide-react";

import {
  useBankTransferPayments,
  useApproveBankTransferPayment,
  useRejectBankTransferPayment,
} from "@/hooks/useAdmin";

import PaymentCard from "./components/PaymentCard";
import PaymentViewerModal from "./components/PaymentViewerModal";
import RejectModal from "./components/RejectModal";

export default function AdminPaymentsPage() {
  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [rejectPayment, setRejectPayment] =
    useState(null);

  const {
    data,
    isLoading,
    refetch,
  } = useBankTransferPayments();

  const approveMutation =
    useApproveBankTransferPayment();

  const rejectMutation =
    useRejectBankTransferPayment();

  const payments = data?.payments || [];

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="uppercase tracking-[.4em] text-pink-500 text-xs font-black">
            ADMIN
          </p>

          <h1 className="text-4xl font-black mt-2">
            Bank Transfer Payments
          </h1>

          <p className="text-zinc-500 mt-2">
            Review uploaded payment receipts
            and approve or reject them.
          </p>

        </div>

        <button
          onClick={refetch}
          className="h-12 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center gap-2"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>

      </div>

      {/* Empty */}

      {payments.length === 0 && (
        <div className="rounded-3xl border border-white/5 bg-zinc-900 py-24 text-center">

          <h2 className="text-2xl font-black">
            No Receipts
          </h2>

          <p className="text-zinc-500 mt-3">
            No bank transfer receipts have
            been uploaded yet.
          </p>

        </div>
      )}

      {/* Grid */}

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">

        {payments.map((payment) => (

          <PaymentCard
            key={payment._id}
            payment={payment}
            approving={approveMutation.isPending}
            rejecting={rejectMutation.isPending}
            onView={setSelectedPayment}
            onApprove={(payment) =>
              approveMutation.mutate(payment._id)
            }
            onReject={(payment) =>
              setRejectPayment(payment)
            }
          />

        ))}

      </div>

      {/* Receipt Viewer */}

      <PaymentViewerModal
        payment={selectedPayment}
        onClose={() =>
          setSelectedPayment(null)
        }
      />

      {/* Reject Modal */}

      <RejectModal
        payment={rejectPayment}
        loading={rejectMutation.isPending}
        onClose={() =>
          setRejectPayment(null)
        }
        onSubmit={(reason) => {

          rejectMutation.mutate(
            {
              id: rejectPayment._id,
              reason,
            },
            {
              onSuccess: () =>
                setRejectPayment(null),
            }
          );

        }}
      />

    </div>
  );
}
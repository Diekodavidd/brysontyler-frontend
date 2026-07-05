import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  Copy,
  CheckCircle2,
  Clock3,
  Wallet,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { usePayment } from "@/hooks/usePayment";


export default function PaymentPage() {
  const { paymentId } = useParams();
const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    data,
    error,
    isError,
    isLoading,
    refetch,
} = usePayment(paymentId);

console.log(data);
console.log(error);
useEffect(() => {
    if (!payment?.completed) return;

    queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
    });

    queryClient.invalidateQueries({
        queryKey: ["creators"],
    });

    setTimeout(() => {
        navigate("/dashboard/subscriptions");
    }, 1500);

}, [payment]);
const payment = data?.payment;

console.log("QUERY DATA:", data);
console.log("PAYMENT:", payment);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!payment?.validUntil) return;

    const timer = setInterval(() => {
      const diff =
        new Date(payment.validUntil) - new Date();

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        return;
      }

      const mins = Math.floor(diff / 60000);

      const secs = Math.floor(
        (diff % 60000) / 1000
      );

      setTimeLeft(
        `${mins}:${secs
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [payment]);

useEffect(() => {
  if (!payment) return;

  if (payment.completed) {
    const timer = setTimeout(() => {
      switch (payment.paymentType) {
        case "membership":
          navigate("/dashboard/membership");
          break;

        case "wallet":
          navigate("/dashboard/wallet");
          break;

        case "coins":
          navigate("/dashboard/coins");
          break;

        case "subscription":
          navigate("/dashboard/subscriptions");
          break;

        default:
          navigate("/dashboard");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [payment, navigate]);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

 if (isLoading || !payment) {
  return (
    <div className="py-32 text-center">
      Loading Payment...
    </div>
  );
}

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="uppercase tracking-[.35em] text-yellow-400 text-xs font-black">
              Crypto Payment
            </p>

            <h1 className="text-4xl font-black mt-3">
              {payment.membershipPlan} Membership
            </h1>

          </div>

          <button
            onClick={refetch}
            className="rounded-xl bg-zinc-800 p-3"
          >
            <RefreshCw size={20} />
          </button>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="rounded-3xl border border-white/5 bg-zinc-900 p-8">

          <div className="flex justify-center">

            <QRCode
              value={payment.payAddress}
              size={240}
              bgColor="#fff"
              fgColor="#000"
            />

          </div>

          <p className="text-center text-zinc-500 mt-6">
            Scan using your crypto wallet
          </p>

        </div>

        <div className="space-y-5">

          <Card
            icon={<Wallet />}
            title="Wallet Address"
            value={payment.payAddress}
            onCopy={() =>
              copy(payment.payAddress)
            }
          />

          <Card
            icon={<CheckCircle2 />}
            title="Amount"
            value={`${payment.payAmount} ${payment.payCurrency}`}
          />

          <Card
            icon={<Wallet />}
            title="Network"
            value={payment.network}
          />

          <Card
            icon={<Clock3 />}
            title="Expires In"
            value={timeLeft}
          />

          <Card
  icon={<CheckCircle2 />}
  title="Status"
  value={
    payment.completed
      ? "Payment Completed ✅"
      : payment.paymentStatus
  }
/>

        </div>

      </div>
{payment.completed && (
  <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
    <h2 className="text-2xl font-black text-green-400">
      Payment Successful 🎉
    </h2>

    <p className="mt-2 text-zinc-300">
      Your payment has been confirmed and your account has already been updated.
      Redirecting...
    </p>
  </div>
)}
      <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8">

        <h2 className="font-black text-xl">
          Payment Instructions
        </h2>

        <ul className="space-y-3 mt-5 text-zinc-300">

          <li>
            • Send exactly{" "}
            <strong>
              {payment.payAmount}{" "}
              {payment.payCurrency}
            </strong>
          </li>

          <li>
            • Send only on the{" "}
            <strong>{payment.network}</strong>{" "}
            network.
          </li>

          <li>
            • Do not send from an unsupported
            network.
          </li>

          <li>
            • Membership activates
            automatically after confirmation.
          </li>

          <li>
            • This page refreshes every 5
            seconds automatically.
          </li>

        </ul>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  icon,
  onCopy,
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-white/5 p-5">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3 text-yellow-400">

            {icon}

            <p className="font-bold">
              {title}
            </p>

          </div>

          <p className="mt-4 break-all text-lg font-semibold">
            {value}
          </p>

        </div>

        {onCopy && (
          <button
            onClick={onCopy}
            className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700"
          >
            <Copy size={18} />
          </button>
        )}

      </div>

    </div>
  );
}
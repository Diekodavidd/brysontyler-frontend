import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    ArrowLeft,
    RefreshCw,
    ExternalLink,
    CheckCircle2,
    Clock3,
    DollarSign,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";
import { usePayment } from "@/hooks/usePayment";

export default function PaymentPage() {
    const { paymentId } = useParams();

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = usePayment(paymentId);

    const payment = data?.payment;

    useEffect(() => {
        if (!payment?.completed) return;

        queryClient.invalidateQueries({
            queryKey: ["subscriptions"],
        });

        queryClient.invalidateQueries({
            queryKey: ["membership"],
        });

        queryClient.invalidateQueries({
            queryKey: ["wallet"],
        });

        setTimeout(() => {
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
    }, [payment]);

    if (isLoading) {
        return (
            <div className="py-40 text-center text-white">
                Loading payment...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-40 text-center text-red-500">
                {error?.response?.data?.message ||
                    "Unable to load payment."}
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="py-40 text-center">
                Payment not found.
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

            <div className="rounded-3xl bg-zinc-900 border border-yellow-500/20 p-8">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="uppercase tracking-[.35em] text-yellow-400 text-xs font-black">
                            Secure Payment
                        </p>

                        <h1 className="text-4xl font-black mt-3">

                            {payment.paymentType.toUpperCase()}

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

                <div className="rounded-3xl bg-zinc-900 border border-white/5 p-8 flex flex-col justify-center">

                    <h2 className="text-3xl font-black mb-5">
                        Complete your payment
                    </h2>

                    <p className="text-zinc-400 mb-8 leading-8">

                        You'll be redirected to NOWPayments where you can
                        pay using your Debit Card, Credit Card or Crypto.

                    </p>

                    <button
                        onClick={() =>
                            window.open(
                                payment.invoiceUrl,
                                "_blank"
                            )
                        }
                        className="py-5 rounded-2xl bg-yellow-500 text-black font-black flex justify-center items-center gap-3"
                    >
                        Continue To Payment

                        <ExternalLink size={18} />
                    </button>

                </div>

                <div className="space-y-5">

                    <Card
                        icon={<DollarSign />}
                        title="Amount"
                        value={`$${payment.amount}`}
                    />

                    <Card
                        icon={<CheckCircle2 />}
                        title="Status"
                        value={
                            payment.completed
                                ? "Completed ✅"
                                : payment.paymentStatus
                        }
                    />

                    <Card
                        icon={<Clock3 />}
                        title="Provider"
                        value="NOWPayments"
                    />

                    <Card
                        icon={<CheckCircle2 />}
                        title="Invoice ID"
                        value={payment.invoiceId}
                    />

                </div>

            </div>

            {payment.completed && (

                <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-8">

                    <h2 className="text-3xl font-black text-green-400">

                        Payment Successful 🎉

                    </h2>

                    <p className="mt-4 text-zinc-300">

                        Your payment has been confirmed.

                        Redirecting...

                    </p>

                </div>

            )}

            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8">

                <h2 className="font-black text-xl">

                    Instructions

                </h2>

                <ul className="mt-5 space-y-3 text-zinc-300">

                    <li>
                        • Click the button above.
                    </li>

                    <li>
                        • Pay using Debit Card, Credit Card or Crypto.
                    </li>

                    <li>
                        • Once payment is confirmed your account updates automatically.
                    </li>

                    <li>
                        • You can refresh this page anytime.
                    </li>

                </ul>

            </div>

        </div>
    );
}

function Card({
    icon,
    title,
    value,
}) {
    return (
        <div className="rounded-2xl bg-zinc-900 border border-white/5 p-5">

            <div className="flex items-center gap-3 text-yellow-400">

                {icon}

                <span className="font-bold">

                    {title}

                </span>

            </div>

            <p className="mt-4 text-lg font-semibold break-all">

                {value}

            </p>

        </div>
    );
}
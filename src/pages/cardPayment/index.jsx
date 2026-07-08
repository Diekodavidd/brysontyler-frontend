import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, ArrowLeft } from "lucide-react";
import { httpGet } from "@/lib/http";

export default function CardPaymentPage() {

    const { paymentId } = useParams();

    const navigate = useNavigate();

    const {
        data: payment,
        isLoading,
    } = useQuery({
        queryKey: ["payment", paymentId],
        queryFn: async () => {
            const res = await httpGet(`/payments/${paymentId}`);
            return res.payment;
        },
    });

    if (isLoading)
        return <div>Loading...</div>;

    return (

        <div className="max-w-3xl mx-auto space-y-8">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
            >
                <ArrowLeft size={18}/>
                Back
            </button>

            <div className="rounded-3xl bg-zinc-900 border border-white/5 p-8">

                <CreditCard
                    size={45}
                    className="text-pink-500"
                />

                <h1 className="text-4xl font-black mt-6">
                    Card Payment
                </h1>

                <p className="text-zinc-400 mt-3">
                    Continue securely to Paxum to complete your payment.
                </p>

            </div>

            <div className="rounded-3xl bg-zinc-900 border border-white/5 p-8 space-y-6">

                <Row
                    label="Amount"
                    value={`$${payment.amount}`}
                />

                <Row
                    label="Payment Type"
                    value={payment.paymentType}
                />

                <Row
                    label="Status"
                    value={payment.paymentStatus}
                />

                <button
                    className="w-full h-14 rounded-2xl bg-pink-600 hover:bg-pink-700 font-bold"
                    onClick={() => {
                        window.location.href =
                            payment.checkoutUrl;
                    }}
                >
                    Continue to Secure Checkout
                </button>

            </div>

        </div>

    );
}

function Row({ label, value }) {

    return (

        <div className="flex justify-between border-b border-white/5 pb-4">

            <span className="text-zinc-500">
                {label}
            </span>

            <strong>{value}</strong>

        </div>

    );

}
import { useState } from "react";
import { X, Wallet, Loader2 } from "lucide-react";

export default function AddFundsModal({
  open,
  onClose,
  onSubmit,
  isPending,
}) {
  const [amount, setAmount] = useState("");

  if (!open) return null;

  const submit = () => {
    const value = Number(amount);

    if (!value || value < 5) {
      alert("Minimum deposit is $5");
      return;
    }

    onSubmit(value);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-md rounded-3xl bg-zinc-900 border border-yellow-500/20 p-8">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Wallet className="text-yellow-400" />

            <h2 className="text-2xl font-black">
              Add Funds
            </h2>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <p className="mt-5 text-zinc-400">
          Enter the amount you'd like to add to your wallet.
        </p>

        <div className="mt-8">

          <label className="text-sm text-zinc-400">
            Amount (USD)
          </label>

          <input
            type="number"
            min={5}
            placeholder="50"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="mt-2 w-full rounded-2xl bg-black border border-white/10 p-4 outline-none focus:border-yellow-500"
          />

        </div>

        <div className="grid grid-cols-4 gap-3 mt-6">

          {[10,25,50,100].map((price)=>(
            <button
              key={price}
              onClick={()=>setAmount(price)}
              className="rounded-xl bg-zinc-800 py-3 hover:bg-yellow-500 hover:text-black transition"
            >
              ${price}
            </button>
          ))}

        </div>

        <button
          onClick={submit}
          disabled={isPending}
          className="mt-8 w-full rounded-2xl bg-yellow-500 text-black py-4 font-black flex justify-center items-center gap-2 disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2
                className="animate-spin"
                size={18}
              />
              Creating Payment...
            </>
          ) : (
            "Continue to Payment"
          )}
        </button>

      </div>
    </div>
  );
}
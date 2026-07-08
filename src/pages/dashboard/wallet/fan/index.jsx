import {
  Wallet,
  Coins,
  CreditCard,
  ArrowUpRight,
  Plus,
  Download,
  Receipt,
  ArrowDownLeft,
  Loader2,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import {  useBuyCoins,useDepositWallet } from "@/hooks/usePayment";
import { useWallet  } from "@/hooks/useWallet";

import AddFundsModal from "./components/AddFundsModal";


export default function FanWalletPage() {
 const navigate = useNavigate();
 const [loadingCoin, setLoadingCoin] = useState(null);
const [showModal, setShowModal] =
  useState(false);
const user = useAuthStore((state) => state.user);
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedProvider, setSelectedProvider] = useState("nowpayments");
const [isCreatingPayment, setIsCreatingPayment] = useState(false);

const [paymentAction, setPaymentAction] = useState(null);
// "wallet" | "coins"

const [pendingAmount, setPendingAmount] = useState(0);

const [pendingCoin, setPendingCoin] = useState({
    coinType: "",
    quantity: 1,
});
const {
  data,
  isLoading,
} = useWallet();
const {
    mutateAsync: createCoinPayment,
} = useBuyCoins();

const {
    mutateAsync: createWalletPayment,
} = useDepositWallet();
const wallet = data?.wallet;

const transactions =
  wallet?.payments || [];

const totalSpent = useMemo(() => {
  return transactions
    .filter((tx) =>
      ["finished", "confirmed"].includes(tx.paymentStatus)
    )
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
}, [transactions]);

const increase = (type)=>{

setQuantities(prev=>({

...prev,

[type]:prev[type]+1

}));

};

const decrease=(type)=>{

setQuantities(prev=>({

...prev,

[type]:

Math.max(1,prev[type]-1)

}));

};

const coinTypes = [
  {
    type: "gold",
    name: "Gold Coin",
    price: 5,
    description: "Highest Value",
  },
  {
    type: "silver",
    name: "Silver Coin",
    price: 2,
    description: "Medium Value",
  },
  {
    type: "ruby",
    name: "Ruby Coin",
    price: 1,
    description: "Entry Value",
  },
];

const [quantities, setQuantities] = useState({
  gold: 1,
  silver: 1,
  ruby: 1,
});
if (isLoading) {
  return (
    <div className="h-[70vh] flex items-center justify-center text-zinc-500">
      Loading wallet...
    </div>
  );
}

const handleBuyCoins = (coinType, quantity) => {
    setPendingCoin({
        coinType,
        quantity,
    });

    setPaymentAction("coins");
    setShowPaymentModal(true);
};

const handleAddFunds = (amount) => {
    setPendingAmount(amount);
    setPaymentAction("wallet");
    setShowModal(false);
    setShowPaymentModal(true);
};



const handleContinuePayment = async () => {
    try {
        setIsCreatingPayment(true);

        let res;

        if (paymentAction === "wallet") {
            res = await createWalletPayment({
                amount: pendingAmount,
                provider: selectedProvider,
            });
        }

        if (paymentAction === "coins") {
            res = await createCoinPayment({
                coinType: pendingCoin.coinType,
                quantity: pendingCoin.quantity,
                provider: selectedProvider,
            });
        }

        setShowPaymentModal(false);

        // navigate(`/dashboard/payment/${res.payment._id}`);
    if (selectedProvider === "paxum") {
        navigate(`/dashboard/payment/card/${res.payment._id}`);
    } else {
        navigate(`/dashboard/payment/${res.payment._id}`);
    }
      }catch (err) {
    console.error("Deposit Error:", err.response?.data || err);
    } finally {
        setIsCreatingPayment(false);
    }
};
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        <div>

          <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
            Wallet
          </p>

          <h1 className="text-5xl font-black mt-3">
            My Wallet
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage your balance, coins and payment methods.
          </p>

        </div>

        <button
  onClick={() => setShowModal(true)}
  className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition flex items-center gap-2"
>
  <Plus size={18} />
  Add Funds
</button>

      </div>

      {/* Balance Cards */}

   {/* Wallet Overview */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

  <div className="rounded-3xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-black p-7">

    <Coins size={30} />

    <p className="uppercase text-xs font-black mt-5">
      Coin Balance
    </p>

    <div className="space-y-3 mt-5">

<div className="flex justify-between">

<span>🥇 Gold</span>

<strong>
{user?.coinBalances?.gold || 0}
</strong>

</div>

<div className="flex justify-between">

<span>🥈 Silver</span>

<strong>
{user?.coinBalances?.silver || 0}
</strong>

</div>

<div className="flex justify-between">

<span>♦ Ruby</span>

<strong>
{user?.coinBalances?.ruby || 0}
</strong>

</div>

</div>

    <p className="mt-3 font-semibold">
      ≈ ${(user?.coinBalance / 100).toFixed(2)}
    </p>

  </div>

  <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

    <Wallet className="text-green-400" size={28} />

    <p className="uppercase text-xs mt-5 text-zinc-500 font-bold">
      Wallet Balance
    </p>

    <h2 className="text-4xl font-black mt-2">
${wallet?.balance?.toFixed(2) || "0.00"}   
 </h2>

    <p className="text-zinc-500 mt-3">
      Available Credit
    </p>

  </div>

  <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

    <ArrowUpRight
      className="text-red-400"
      size={28}
    />

    <p className="uppercase text-xs mt-5 text-zinc-500 font-bold">
      Total Spent
    </p>

    <h2 className="text-4xl font-black mt-2">
      ${totalSpent.toFixed(2)}
    </h2>

    <p className="text-zinc-500 mt-3">
      Lifetime Spending
    </p>

  </div>

  <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

    <CreditCard
      className="text-yellow-400"
      size={28}
    />

    <p className="uppercase text-xs mt-5 text-zinc-500 font-bold">
      Membership
    </p>

    <h2 className="text-4xl font-black mt-2">
{wallet?.membership?.plan || "FREE"}
    </h2>

    <p className="text-green-400 mt-3">
      Active
    </p>

  </div>

</div>

{/* Coin Conversion */}

<div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-black p-8">

  <div className="flex items-center justify-between flex-wrap gap-8">

    <div className="max-w-lg">

      <h2 className="text-2xl font-black">
        Coin Store
      </h2>

      <p className="text-zinc-500 mt-3">
        Purchase individual coin types in any quantity.
        Each coin has a different value and can be used
        across premium videos, livestreams, tipping,
        exclusive content and creator interactions.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-4">

      {coinTypes.map((coin) => (

        <div
          key={coin.type}
          className="rounded-2xl bg-black/40 border border-white/5 px-6 py-5 text-center"
        >

          <Coins
            size={30}
            className="mx-auto text-yellow-400 mb-3"
          />

          <h3 className="font-black text-lg">
            {coin.name}
          </h3>

          <p className="text-yellow-400 font-bold mt-2">
            ${coin.price} / Coin
          </p>

          <p className="text-xs text-zinc-500 mt-2">
            {coin.description}
          </p>

        </div>

      ))}

    </div>

  </div>

</div>





{/* Purchase Coins */}

<div className="grid lg:grid-cols-3 gap-6">

  {coinTypes.map((coin) => (

    <div
      key={coin.type}
      className="rounded-3xl bg-zinc-900 border border-white/5 p-7 hover:border-yellow-500 transition"
    >

      <Coins
        size={36}
        className="text-yellow-400"
      />

      <h2 className="text-3xl font-black mt-5">
        {coin.name}
      </h2>

      <p className="text-zinc-500 mt-2">
        ${coin.price} per coin
      </p>

      <div className="mt-6">

        <label className="text-sm text-zinc-400">
          Quantity
        </label>

        <input
          type="number"
          min={1}
          value={quantities[coin.type]}
          onChange={(e) =>
            setQuantities((prev) => ({
              ...prev,
              [coin.type]:
                Number(e.target.value) || 1,
            }))
          }
          className="mt-2 w-full rounded-xl bg-black border border-white/10 px-4 py-3 outline-none focus:border-yellow-500"
        />

      </div>

      <div className="mt-6">

        <p className="text-sm text-zinc-500">
          Total
        </p>

        <h3 className="text-3xl font-black text-yellow-400">
          $
          {(
            coin.price *
            quantities[coin.type]
          ).toFixed(2)}
        </h3>

      </div>

      <button
disabled={loadingCoin === coin.type}
        onClick={() =>
          handleBuyCoins(
            coin.type,
            quantities[coin.type]
          )
        }
        className="mt-8 w-full rounded-2xl bg-yellow-500 text-black py-3 font-black hover:bg-yellow-400 disabled:opacity-60 flex justify-center items-center gap-2"
      >
        {
loadingCoin === coin.type ? (
    <>
        <Loader2
            size={18}
            className="animate-spin"
        />
        Creating Payment...
    </>
) : (
    "Buy Coins"
)}
      </button>

    </div>

  ))}

</div>


      {/* Transactions */}

      <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">

        <div className="flex items-center gap-3 px-8 py-6 border-b border-white/5">

          <Receipt className="text-yellow-400" />

          <h2 className="text-xl font-black">
            Transaction History
          </h2>

        </div>

        <div>

          {transactions.map((tx) => {
const success = [

"confirmed",

"finished",

"sending",

"partially_paid",

].includes(tx.paymentStatus);
            <div
              key={tx._id}
              className="flex justify-between items-center px-8 py-6 border-b border-white/5 last:border-none hover:bg-white/[0.02] transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">

                  {tx.type === "deposit" ? (
                    <Download className="text-green-400" size={20} />
                  ) : (
                    <CreditCard className="text-yellow-400" size={20} />
                  )}

                </div>

                <div>

                  <h3 className="font-bold">
{
tx.paymentType==="coins" &&

`${tx.coinPurchase.quantity}
${tx.coinPurchase.coinType}
coins`
}

{
tx.paymentType==="wallet" &&
"Wallet Deposit"
}

{
tx.paymentType==="membership" &&
`${tx.membershipPlan} Membership`
}

{
tx.paymentType==="subscription" &&
`Subscription to ${tx.creatorId?.name}`
}
                      </h3>

                  <p className="text-zinc-500 text-sm">
{new Date(tx.createdAt).toLocaleString()}
                  </p>

                </div>

              </div>

              <div
              
                className={`font-black text-lg ${
    success
        ? "text-green-400"
        : "text-red-400"
}`}
              >
-${tx.amount}              </div>

            </div>

})}

        </div>

      </div>
<AddFundsModal
    open={showModal}
    onClose={() => setShowModal(false)}
    onSubmit={handleAddFunds}
    isPending={isCreatingPayment}
/>
{showPaymentModal && (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">

    <div className="bg-zinc-900 rounded-3xl w-full max-w-lg p-8 border border-white/10">

      <h2 className="text-3xl font-black">
        Choose Payment Method
      </h2>

      <p className="text-zinc-400 mt-2">
        Select how you'd like to pay.
      </p>

      <div className="space-y-4 mt-8">

        <button
          disabled={isCreatingPayment}
          onClick={() => setSelectedProvider("nowpayments")}
          className={`w-full rounded-2xl p-5 border transition ${
            selectedProvider === "nowpayments"
              ? "border-pink-500 bg-pink-500/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="text-left">
            <h3 className="font-bold">
              Crypto
            </h3>

            <p className="text-sm text-zinc-400">
              BTC • ETH • USDT
            </p>
          </div>
        </button>

        <button
          disabled={isCreatingPayment}
          onClick={() => setSelectedProvider("paxum")}
          className={`w-full rounded-2xl p-5 border transition ${
            selectedProvider === "paxum"
              ? "border-pink-500 bg-pink-500/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="text-left">
            <h3 className="font-bold">
              Credit / Debit Card
            </h3>

            <p className="text-sm text-zinc-400">
              Secure card payment via Paxum
            </p>
          </div>
        </button>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          disabled={isCreatingPayment}
          onClick={() => setShowPaymentModal(false)}
          className="flex-1 h-12 rounded-xl border border-white/10 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={handleContinuePayment}
          disabled={isCreatingPayment}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition ${
            isCreatingPayment
              ? "bg-pink-500/60 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {isCreatingPayment ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Creating Payment...
            </>
          ) : (
            "Continue"
          )}
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}
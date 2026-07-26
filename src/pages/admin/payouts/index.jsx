import { useState } from "react";
import {
  Wallet,
  CheckCircle2,
  XCircle,
  Clock3,
  Search,
  Eye,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { useAdminPayouts, useAdminPayoutStats } from "../../../hooks/useAdmin";

export default function AdminPayoutsPage() {
  const [search, setSearch] = useState("");

const {
  data,
  isLoading,
} = useAdminPayouts();

const payouts =
  data?.payouts || [];

  const {
  data: statsData,
} = useAdminPayoutStats();

const stats =
  statsData?.stats || {};

  const filtered = payouts.filter((p) =>
    p.creator
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pending =
  stats.pending || 0;

const approved =
  stats.approved || 0;

const totalRequests =
  stats.totalRequests || 0;

const totalAmount =
  stats.totalRequested || 0;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-end justify-between">

        <div>

          <p className="uppercase tracking-[.35em] text-xs font-black text-amber-500">

            Finance

          </p>

          <h1 className="mt-3 text-4xl font-black">

            Creator Payout Requests

          </h1>

          <p className="mt-3 text-zinc-500">

            Review, approve and process creator withdrawals.

          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Pending"
          value={pending}
          icon={Clock3}
          color="text-yellow-400"
          bg="bg-yellow-500/10"
        />

        <StatCard
          title="Approved"
          value={approved}
          icon={CheckCircle2}
          color="text-green-400"
          bg="bg-green-500/10"
        />

        <StatCard
          title="Total Requests"
          value={payouts.length}
          icon={Wallet}
          color="text-blue-400"
          bg="bg-blue-500/10"
        />

        <StatCard
          title="Requested"
          value={`$${totalAmount}`}
          icon={DollarSign}
          color="text-amber-400"
          bg="bg-amber-500/10"
        />

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-5 top-4 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search creator..."
          className="w-full rounded-2xl border border-white/10 bg-[#090909] py-4 pl-14 pr-5 outline-none focus:border-amber-500"
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-[30px] border border-white/5 bg-[#090909]">

        <table className="w-full">

          <thead className="border-b border-white/5 bg-black/30">

            <tr className="text-left text-sm text-zinc-400">

              <th className="px-8 py-5">
                Creator
              </th>

              <th>Amount</th>

              <th>Method</th>

              <th>Status</th>

              <th>Date</th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((payout) => (

              <tr
                key={payout.id}
                className="border-b border-white/5 hover:bg-white/5"
              >

                <td className="px-8 py-6 font-bold">

{payout.creatorId?.name}
                </td>

                <td className="font-bold text-green-400">

${payout.amount.toLocaleString()}
                </td>

                <td>{payout.method}</td>

                <td>

                  <StatusBadge
                    status={payout.status}
                  />

                </td>

                <td className="text-zinc-500">

{new Date(
  payout.requestedAt
).toLocaleDateString()}
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="rounded-xl bg-white/5 p-3 hover:bg-amber-500 hover:text-black">

                      <Eye size={18} />

                    </button>

                    <button className="rounded-xl bg-green-500/10 p-3 text-green-400 hover:bg-green-500 hover:text-white">

                      <CheckCircle2 size={18} />

                    </button>

                    <button className="rounded-xl bg-red-500/10 p-3 text-red-400 hover:bg-red-500 hover:text-white">

                      <XCircle size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Card */}

      <div className="rounded-[30px] border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent p-8 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-black">

            Process All Pending Requests

          </h2>

          <p className="mt-2 text-zinc-500">

            Bulk approve eligible payout requests.

          </p>

        </div>

        <button className="flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 font-black text-black hover:bg-amber-400">

          Process All

          <ArrowUpRight size={18} />

        </button>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#090909] p-6">

      <div className="flex items-center justify-between">

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${bg}`}
        >
          <Icon
            size={22}
            className={color}
          />
        </div>

        <h2 className="text-3xl font-black">
          {value}
        </h2>

      </div>

      <p className="mt-6 text-xs uppercase tracking-[.25em] text-zinc-500 font-black">

        {title}

      </p>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending:
      "bg-yellow-500/10 text-yellow-400",
    approved:
      "bg-green-500/10 text-green-400",
    declined:
      "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-2 text-xs font-black uppercase ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}
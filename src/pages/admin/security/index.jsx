import { useState } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  Activity,
  Globe,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  Eye,
  Ban,
} from "lucide-react";

export default function AdminSecurityPage() {
  const [maintenance, setMaintenance] =
    useState(false);

  const [twoFactor, setTwoFactor] =
    useState(true);

  const [ipLock, setIpLock] =
    useState(false);

  const securityLogs = [
    {
      id: 1,
      action: "Admin Login",
      admin: "Alexander",
      ip: "192.168.0.1",
      time: "2 mins ago",
      status: "success",
    },
    {
      id: 2,
      action: "Creator Approved",
      admin: "Alexander",
      ip: "192.168.0.1",
      time: "18 mins ago",
      status: "success",
    },
    {
      id: 3,
      action: "Failed Login Attempt",
      admin: "Unknown",
      ip: "105.112.45.12",
      time: "42 mins ago",
      status: "warning",
    },
    {
      id: 4,
      action: "Membership Updated",
      admin: "Alexander",
      ip: "192.168.0.1",
      time: "1 hour ago",
      status: "success",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-end">
        <div>
          <p className="uppercase tracking-[.35em] text-xs text-amber-500 font-black">
            Security Center
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Platform Security
          </h1>

          <p className="mt-3 text-zinc-500">
            Manage security settings, monitor
            administrator activity and protect the
            platform.
          </p>
        </div>

        <button className="rounded-2xl bg-amber-500 px-6 py-3 font-black text-black hover:bg-amber-400">
          Run Security Scan
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">
        <Stat
          title="Security Score"
          value="98%"
          icon={Shield}
          color="emerald"
        />

        <Stat
          title="Blocked Attempts"
          value="148"
          icon={Ban}
          color="red"
        />

        <Stat
          title="Active Sessions"
          value="7"
          icon={Activity}
          color="amber"
        />

        <Stat
          title="Admins Online"
          value="2"
          icon={Eye}
          color="blue"
        />
      </div>

      {/* Controls */}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-[30px] border border-white/5 bg-[#090909] p-8">
          <h2 className="text-2xl font-black mb-8">
            Security Controls
          </h2>

          <div className="space-y-6">
            <SwitchRow
              icon={Lock}
              title="Two Factor Authentication"
              value={twoFactor}
              onChange={setTwoFactor}
            />

            <SwitchRow
              icon={Globe}
              title="IP Restriction"
              value={ipLock}
              onChange={setIpLock}
            />

            <SwitchRow
              icon={RefreshCw}
              title="Maintenance Mode"
              value={maintenance}
              onChange={setMaintenance}
            />
          </div>
        </div>

        <div className="rounded-[30px] border border-white/5 bg-[#090909] p-8">
          <h2 className="text-2xl font-black mb-8">
            Security Health
          </h2>

          <div className="space-y-6">
            <Health
              icon={CheckCircle2}
              text="SSL Certificate Active"
              color="green"
            />

            <Health
              icon={CheckCircle2}
              text="Database Encrypted"
              color="green"
            />

            <Health
              icon={CheckCircle2}
              text="Cloud Storage Protected"
              color="green"
            />

            <Health
              icon={AlertTriangle}
              text="3 Failed Login Attempts Today"
              color="yellow"
            />

            <Health
              icon={Smartphone}
              text="2FA Enabled For Admin"
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Logs */}

      <div className="rounded-[30px] border border-white/5 bg-[#090909] overflow-hidden">
        <div className="border-b border-white/5 px-8 py-6">
          <h2 className="text-2xl font-black">
            Security Activity
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-black/20 text-zinc-500">
            <tr>
              <th className="px-8 py-5 text-left">
                Action
              </th>
              <th className="text-left">Admin</th>
              <th className="text-left">IP</th>
              <th className="text-left">Time</th>
              <th className="text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {securityLogs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-8 py-5 font-bold">
                  {log.action}
                </td>

                <td>{log.admin}</td>

                <td className="text-zinc-400">
                  {log.ip}
                </td>

                <td className="text-zinc-500">
                  {log.time}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-bold ${
                      log.status === "success"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="rounded-[30px] border border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">
            Emergency Lockdown
          </h2>

          <p className="mt-2 text-zinc-500">
            Instantly disable creator uploads,
            withdrawals and public access during a
            security incident.
          </p>
        </div>

        <button className="rounded-2xl bg-red-600 px-8 py-4 font-black hover:bg-red-500">
          Activate Lockdown
        </button>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  icon: Icon,
  color,
}) {
  const colors = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    red: "bg-red-500/10 text-red-400",
    amber: "bg-amber-500/10 text-amber-400",
    blue: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="rounded-[26px] border border-white/5 bg-[#090909] p-6">
      <div className="flex items-center justify-between">
        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colors[color]}`}
        >
          <Icon size={22} />
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

function SwitchRow({
  icon: Icon,
  title,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-amber-500/10 p-3">
          <Icon
            size={20}
            className="text-amber-400"
          />
        </div>

        <span className="font-semibold">
          {title}
        </span>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`h-8 w-16 rounded-full transition ${
          value
            ? "bg-green-500"
            : "bg-zinc-700"
        }`}
      >
        <div
          className={`h-7 w-7 rounded-full bg-white transition ${
            value
              ? "translate-x-8"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function Health({
  icon: Icon,
  text,
  color,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-5">
      <Icon
        size={20}
        className={
          color === "green"
            ? "text-green-400"
            : "text-yellow-400"
        }
      />

      <span>{text}</span>
    </div>
  );
}
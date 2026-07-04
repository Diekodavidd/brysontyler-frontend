import { useState } from "react";
import {
  Save,
  Shield,
  Bell,
  Database,
  Globe,
  Mail,
  Lock,
  Server,
  Image,
  Settings2,
  RefreshCw,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "Bryson Tyler",
    supportEmail: "support@brysontyler.com",
    maintenance: false,
    creatorRegistration: true,
    emailNotifications: true,
    autoApproveCreators: false,
    autoApproveContent: false,
    allowFreeRegistration: true,
    maxUploadSize: 5000,
    defaultMembership: "FREE",
  });

  const update = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    console.log(settings);

    /*
      axios.patch("/api/admin/settings", settings)
    */
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-end justify-between">

        <div>

          <p className="uppercase tracking-[.35em] text-xs font-black text-amber-500">
            Administration
          </p>

          <h1 className="text-4xl font-black mt-3">
            Platform Settings
          </h1>

          <p className="text-zinc-500 mt-3">
            Configure your entire Bryson Tyler platform.
          </p>

        </div>

        <button
          onClick={saveSettings}
          className="rounded-2xl bg-amber-500 px-7 py-4 text-black font-black flex items-center gap-3 hover:bg-amber-400"
        >
          <Save size={18} />
          Save Changes
        </button>

      </div>

      {/* General */}

      <section className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

        <div className="flex items-center gap-3 mb-8">

          <Settings2 className="text-amber-400" />

          <h2 className="text-2xl font-black">

            General

          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Platform Name"
            value={settings.platformName}
            onChange={(v) =>
              update("platformName", v)
            }
          />

          <Input
            label="Support Email"
            value={settings.supportEmail}
            onChange={(v) =>
              update("supportEmail", v)
            }
          />

        </div>

      </section>

      {/* Platform */}

      <section className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

        <div className="flex items-center gap-3 mb-8">

          <Globe className="text-amber-400" />

          <h2 className="text-2xl font-black">

            Platform Controls

          </h2>

        </div>

        <div className="space-y-5">

          <Toggle
            title="Maintenance Mode"
            value={settings.maintenance}
            onChange={() =>
              update(
                "maintenance",
                !settings.maintenance
              )
            }
          />

          <Toggle
            title="Allow Creator Registration"
            value={
              settings.creatorRegistration
            }
            onChange={() =>
              update(
                "creatorRegistration",
                !settings.creatorRegistration
              )
            }
          />

          <Toggle
            title="Allow Free Registration"
            value={
              settings.allowFreeRegistration
            }
            onChange={() =>
              update(
                "allowFreeRegistration",
                !settings.allowFreeRegistration
              )
            }
          />

        </div>

      </section>

      {/* Automation */}

      <section className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

        <div className="flex items-center gap-3 mb-8">

          <RefreshCw className="text-amber-400" />

          <h2 className="text-2xl font-black">

            Automation

          </h2>

        </div>

        <div className="space-y-5">

          <Toggle
            title="Auto Approve Creators"
            value={
              settings.autoApproveCreators
            }
            onChange={() =>
              update(
                "autoApproveCreators",
                !settings.autoApproveCreators
              )
            }
          />

          <Toggle
            title="Auto Approve Content"
            value={
              settings.autoApproveContent
            }
            onChange={() =>
              update(
                "autoApproveContent",
                !settings.autoApproveContent
              )
            }
          />

          <Toggle
            title="Email Notifications"
            value={
              settings.emailNotifications
            }
            onChange={() =>
              update(
                "emailNotifications",
                !settings.emailNotifications
              )
            }
          />

        </div>

      </section>

      {/* Upload */}

      <section className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

        <div className="flex items-center gap-3 mb-8">

          <Image className="text-amber-400" />

          <h2 className="text-2xl font-black">

            Upload Limits

          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Maximum Upload Size (MB)"
            type="number"
            value={settings.maxUploadSize}
            onChange={(v) =>
              update("maxUploadSize", v)
            }
          />

          <Select
            label="Default Membership"
            value={
              settings.defaultMembership
            }
            onChange={(v) =>
              update(
                "defaultMembership",
                v
              )
            }
          />

        </div>

      </section>

      {/* System */}

      <section className="grid md:grid-cols-4 gap-6">

        <InfoCard
          icon={Database}
          title="Database"
          value="Healthy"
          color="green"
        />

        <InfoCard
          icon={Server}
          title="Storage"
          value="Bunny CDN"
          color="amber"
        />

        <InfoCard
          icon={Mail}
          title="Email"
          value="Connected"
          color="green"
        />

        <InfoCard
          icon={Shield}
          title="Security"
          value="Protected"
          color="blue"
        />

      </section>

      {/* Security */}

      <section className="rounded-[30px] border border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent p-8">

        <div className="flex justify-between items-center">

          <div>

            <div className="flex items-center gap-3">

              <Lock className="text-red-400" />

              <h2 className="text-2xl font-black">

                Security

              </h2>

            </div>

            <p className="mt-4 text-zinc-500">

              Reset platform tokens, revoke sessions and
              regenerate API credentials.

            </p>

          </div>

          <button className="rounded-2xl bg-red-600 hover:bg-red-500 px-8 py-4 font-black">

            Reset Platform

          </button>

        </div>

      </section>

    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>

      <p className="text-sm font-bold mb-3">

        {label}

      </p>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-amber-500"
      />

    </div>
  );
}

function Select({
  label,
  value,
  onChange,
}) {
  return (
    <div>

      <p className="text-sm font-bold mb-3">

        {label}

      </p>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-amber-500"
      >
        <option>FREE</option>
        <option>VIP</option>
        <option>ELITE</option>
      </select>

    </div>
  );
}

function Toggle({
  title,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 px-6 py-5">

      <span className="font-semibold">

        {title}

      </span>

      <button
        onClick={onChange}
        className={`relative h-8 w-16 rounded-full transition ${
          value
            ? "bg-green-500"
            : "bg-zinc-700"
        }`}
      >
        <div
          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
            value
              ? "left-9"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  const colors = {
    green: "text-green-400 bg-green-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    blue: "text-blue-400 bg-blue-500/10",
  };

  return (
    <div className="rounded-[26px] border border-white/5 bg-[#090909] p-6">

      <div
        className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colors[color]}`}
      >
        <Icon size={22} />
      </div>

      <h3 className="mt-6 text-xl font-black">

        {title}

      </h3>

      <p className="mt-2 text-zinc-500">

        {value}

      </p>

    </div>
  );
}
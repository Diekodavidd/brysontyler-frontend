import { useState } from "react";
import {
  CloudUpload,
  Link as LinkIcon,
  DollarSign,
  Users,
} from "lucide-react";

export default function DashboardModal({ onClose }) {
  const [webhookUrl, setWebhookUrl] = useState(
    "https://your-app.com/webhooks/bryson"
  );

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 max-w-5xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">

    <div>

        <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.25em]">
            Creator Studio
        </p>

        <h2 className="text-4xl font-black mt-2">
            Upload New Content
        </h2>

        <p className="text-zinc-500 mt-3">
            Publish videos, images and premium content to your subscribers.
        </p>

    </div>

    <button
        onClick={onClose}
        className="w-11 h-11 rounded-xl bg-zinc-800 hover:bg-red-500 transition flex items-center justify-center"
    >
        ✕
    </button>

</div>

       
      </div>
    </div>
  );
}
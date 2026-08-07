import {
  Send,
  ShieldCheck,
  Crown,
  Trash2,
  Pin,
  Smile,
} from "lucide-react";

import { useMemo, useState } from "react";

export default function LiveChat({
  messages = [],
  currentUser,
  onSend,
  onDelete,
  onPin,
}) {
  const [text, setText] = useState("");

  const orderedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );
  }, [messages]);

  const submit = () => {
    if (!text.trim()) return;

    onSend?.(text);

    setText("");
  };

  return (
    <div className="rounded-[34px] bg-zinc-900 border border-white/5 flex flex-col h-[700px] overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">

        <div>

          <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">
            Live Chat
          </p>

          <h2 className="text-3xl font-black mt-2">
            Audience Messages
          </h2>

        </div>

        <span className="rounded-full bg-yellow-500/10 text-yellow-400 px-5 py-2 text-sm font-black">
          {messages.length} Messages
        </span>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {!orderedMessages.length && (

          <div className="h-full flex items-center justify-center text-center text-zinc-500">

            Waiting for viewers to send
            messages...

          </div>

        )}

        {orderedMessages.map((message) => (

          <div
            key={message._id}
            className={`rounded-3xl p-5 ${
              message.pinned
                ? "bg-yellow-500/10 border border-yellow-500/30"
                : "bg-black border border-white/5"
            }`}
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <img
                  src={
                    message.user?.profilePicture ||
                    "/avatar.png"
                  }
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-black">

                      {message.user?.name}

                    </h3>

                    {message.user?.role ===
                      "admin" && (

                      <span className="rounded-full bg-red-500/10 text-red-400 px-2 py-1 text-[10px] font-black flex items-center gap-1">

                        <Crown size={11} />

                        ADMIN

                      </span>

                    )}

                    {message.user?.verified && (

                      <ShieldCheck
                        size={14}
                        className="text-sky-400"
                      />

                    )}

                    {message.pinned && (

                      <span className="rounded-full bg-yellow-500 text-black text-[10px] px-2 py-1 font-black">

                        PINNED

                      </span>

                    )}

                  </div>

                  <p className="text-zinc-300 mt-3 leading-7 break-words">

                    {message.message}

                  </p>

                  <span className="text-xs text-zinc-600 mt-3 block">

                    {new Date(
                      message.createdAt
                    ).toLocaleTimeString()}

                  </span>

                </div>

              </div>

              {/* admin Controls */}

              {currentUser?.role ===
                "admin" && (

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      onPin?.(message)
                    }
                    className="w-10 h-10 rounded-xl bg-yellow-500/10 hover:bg-yellow-500 text-yellow-400 hover:text-black flex items-center justify-center transition"
                  >
                    <Pin size={16} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete?.(message)
                    }
                    className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-white/5 p-6">

        <div className="flex gap-4">

          <button className="w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center hover:border-yellow-500 transition">

            <Smile />

          </button>

          <input
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit();
              }
            }}
            placeholder="Send a message..."
            className="flex-1 h-14 rounded-2xl bg-black border border-white/5 px-5 outline-none focus:border-yellow-500"
          />

          <button
            onClick={submit}
            className="h-14 px-7 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black flex items-center gap-2 transition"
          >
            <Send size={18} />
            Send
          </button>

        </div>

      </div>

    </div>
  );
}
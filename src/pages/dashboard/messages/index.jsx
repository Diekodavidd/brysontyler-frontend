/* eslint-disable no-unused-vars */

import { useState, useRef, useMemo } from "react";
import {
  Send,
  Search,
  Paperclip,
  MoreVertical,
  X,
} from "lucide-react";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Alex Rivers",
      lastMsg: "Looking forward to the new drop!",
      time: "10:42 AM",
      timestamp: new Date().setHours(10, 42),
    },
    {
      id: 2,
      name: "Jordan Smith",
      lastMsg: "Can you help me with my sub?",
      time: "9:15 AM",
      timestamp: new Date().setHours(9, 15),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const [messages, setMessages] = useState({
    1: [
      {
        text: "Hey! I really loved the last production.",
        sender: "them",
      },
    ],
    2: [
      {
        text: "Hi, I have a question about my subscription.",
        sender: "them",
      },
    ],
  });

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState(null);

  const fileInputRef = useRef(null);

  const sortedConversations = useMemo(() => {
    return [...conversations].sort(
      (a, b) => b.timestamp - a.timestamp
    );
  }, [conversations]);

  const filteredConversations =
    sortedConversations.filter(
      (c) =>
        c.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        c.lastMsg
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  const sendMessage = () => {
    if (!inputText.trim() && !attachment) return;

    const newMessage = {
      text: inputText,
      sender: "me",
      attachment,
    };

    setMessages({
      ...messages,
      [activeChat.id]: [
        ...(messages[activeChat.id] || []),
        newMessage,
      ],
    });

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              lastMsg:
                inputText || "Sent an attachment",
              time: "Just now",
              timestamp: Date.now(),
            }
          : c
      )
    );

    setInputText("");
    setAttachment(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setAttachment({
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video")
          ? "video"
          : "image",
      });
    }
  };

  return (
    <div className="flex h-[80vh] overflow-hidden rounded-3xl border border-white/5 bg-zinc-900">
      <div className="flex w-1/3 flex-col border-r border-white/5">
        <div className="border-b border-white/5 p-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-zinc-500"
              size={16}
            />

            <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search messages"
              className="w-full rounded-xl border border-white/5 bg-black py-2 pl-10 pr-4 text-sm outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredConversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c)}
              className={`cursor-pointer border-b border-white/5 p-6 hover:bg-white/5 ${
                activeChat.id === c.id
                  ? "bg-white/5"
                  : ""
              }`}
            >
              <div className="mb-1 flex justify-between">
                <span className="font-bold">
                  {c.name}
                </span>

                <span className="text-[10px] text-zinc-500">
                  {c.time}
                </span>
              </div>

              <p className="truncate text-sm text-zinc-400">
                {c.lastMsg}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex w-2/3 flex-col">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <h2 className="text-lg font-black">
            {activeChat.name}
          </h2>

          <MoreVertical
            size={20}
            className="text-zinc-500"
          />
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-8">
          {(messages[activeChat.id] || []).map(
            (msg, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${
                  msg.sender === "me"
                    ? "justify-end"
                    : ""
                }`}
              >
                {msg.sender === "them" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 text-xs font-bold">
                    A
                  </div>
                )}

                <div
                  className={`max-w-sm rounded-2xl p-4 text-sm ${
                    msg.sender === "me"
                      ? "rounded-tr-none bg-yellow-500 text-black"
                      : "rounded-tl-none bg-zinc-800"
                  }`}
                >
                  {msg.attachment && (
                    <div className="mb-2 overflow-hidden rounded-lg">
                      {msg.attachment.type ===
                      "video" ? (
                        <video
                          src={msg.attachment.preview}
                          className="max-h-40"
                        />
                      ) : (
                        <img
                          src={msg.attachment.preview}
                          className="max-h-40"
                          alt=""
                        />
                      )}
                    </div>
                  )}

                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>

        <div className="border-t border-white/5 bg-zinc-900 p-6">
          {attachment && (
            <div className="relative mb-4 inline-block h-20 w-20 overflow-hidden rounded-xl border border-white/10">
              {attachment.type === "video" ? (
                <video
                  src={attachment.preview}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={attachment.preview}
                  className="h-full w-full object-cover"
                  alt=""
                />
              )}

              <button
                onClick={() =>
                  setAttachment(null)
                }
                className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5"
              >
                <X size={12} />
              </button>
            </div>
          )}

          <div className="flex gap-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />

            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="text-zinc-500 hover:text-white"
            >
              <Paperclip size={20} />
            </button>

            <input
              value={inputText}
              onChange={(e) =>
                setInputText(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendMessage()
              }
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-white/5 bg-black px-4 py-2 text-sm outline-none focus:border-yellow-500"
            />

            <button
              onClick={sendMessage}
              className="rounded-xl bg-yellow-500 p-2 text-black hover:bg-yellow-400"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable no-unused-vars */

import {
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";import {
  Send,
  Search,
  Paperclip,
  MoreVertical,
  X,
  CheckCircle2,
  Circle,
  Phone,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
export default function MessagesPage() {

  
const [conversations, setConversations] = useState([
  {
    id: 1,
    name: "Bryson Tyler",
    avatar: "https://i.pravatar.cc/150?img=12",
    verified: true,
    online: true,
    unread: 3,
    role: "Creator",
    lastMsg: "New vlog drops tonight 🔥",
    time: "10:42 AM",
    timestamp: new Date().setHours(10, 42),
  },
  {
    id: 2,
    name: "Liam Carter",
    avatar: "https://i.pravatar.cc/150?img=18",
    verified: false,
    online: false,
    unread: 0,
    role: "Creator",
    lastMsg: "Thanks for subscribing ❤️",
    time: "Yesterday",
    timestamp: new Date().setHours(8, 10),
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
const [typing, setTyping] = useState(false);
  const fileInputRef = useRef(null);
const messagesEndRef = useRef(null);

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
    );setTyping(true);

setTimeout(() => {
  setTyping(false);

  setMessages((prev) => ({
    ...prev,
    [activeChat.id]: [
      ...(prev[activeChat.id] || []),
      {
        sender: "them",
        text: "Thanks for your message ❤️",
      },
    ],
  }));
}, 1800);

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
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, activeChat]);
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
  className={`cursor-pointer border-b border-white/5 p-5 transition ${
    activeChat.id === c.id
      ? "bg-yellow-500/10 border-l-4 border-l-yellow-500"
      : "hover:bg-white/5"
  }`}
>
  <div className="flex items-center gap-4">

    <div className="relative">

      <img
        src={c.avatar}
        className="w-14 h-14 rounded-2xl object-cover"
      />

      {c.online && (
        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-zinc-900" />
      )}

    </div>

    <div className="flex-1 min-w-0">

      <div className="flex justify-between">

        <div className="flex items-center gap-2">

          <h3 className="font-black truncate">
            {c.name}
          </h3>

          {c.verified && (
            <CheckCircle2
              size={16}
              className="fill-sky-400 text-sky-400"
            />
          )}

        </div>

        <span className="text-[11px] text-zinc-500">
          {c.time}
        </span>

      </div>

      <p className="text-xs text-yellow-400 mt-1">
        {c.role}
      </p>

      <div className="flex justify-between items-center mt-2">

        <p className="truncate text-sm text-zinc-400">
          {c.lastMsg}
        </p>

        {c.unread > 0 && (
          <span className="w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center text-[11px] font-black">
            {c.unread}
          </span>
        )}

      </div>

    </div>

  </div>
</div>
          ))}
        </div>
      </div>

      <div className="relative flex w-2/3 flex-col">
       <div className="flex justify-between items-center border-b border-white/5 p-6 bg-black/20">

  <div className="flex items-center gap-4">

    <img
      src={activeChat.avatar}
      className="w-14 h-14 rounded-2xl object-cover"
    />

    <div>

      <div className="flex items-center gap-2">

        <h2 className="text-xl font-black">
          {activeChat.name}
        </h2>

        {activeChat.verified && (
          <CheckCircle2
            size={18}
            className="fill-sky-400 text-sky-400"
          />
        )}

      </div>

      <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">

        <Circle
          size={8}
          className={
            activeChat.online
              ? "fill-green-500 text-green-500"
              : "fill-zinc-500 text-zinc-500"
          }
        />

        {activeChat.online
          ? "Online"
          : "Offline"}

      </p>

    </div>

  </div>

  <div className="flex items-center gap-4">

    <button className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">
      <Phone size={18} />
    </button>

    <button className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">
      <Video size={18} />
    </button>

    <button className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">
      <MoreVertical size={18} />
    </button>

  </div>

</div>

        <motion.div
  initial={{
    opacity: 0,
    y: 15,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: .25,
  }}className="flex-1 space-y-6 overflow-y-auto p-8">
          {(messages[activeChat.id] || []).map(
            (msg, idx) => (
              <motion.div
  initial={{
    opacity: 0,
    y: 15,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: .25,
  }}
                key={idx}
                className={`flex gap-4 ${
                  msg.sender === "me"
                    ? "justify-end"
                    : ""
                }`}
              >
                {msg.sender === "them" && (
                  <motion.div
  initial={{
    opacity: 0,
    y: 15,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: .25,
  }} className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 text-xs font-bold">
                    A
                  </motion.div>
                )}

                <motion.div
  initial={{
    opacity: 0,
    y: 15,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: .25,
  }}
  className={`max-w-md rounded-3xl px-5 py-4 ${
    msg.sender === "me"
      ? "bg-yellow-500 text-black rounded-br-md"
      : "bg-zinc-800 rounded-bl-md"
  }`}
>

  {msg.attachment && (
    <div className="mb-3 overflow-hidden rounded-2xl">

      {msg.attachment.type === "video" ? (
        <video
          src={msg.attachment.preview}
          controls
          className="max-h-56 rounded-2xl"
        />
      ) : (
        <img
          src={msg.attachment.preview}
          className="max-h-56 rounded-2xl"
        />
      )}

    </div>
  )}

  <p>{msg.text}</p>

  <div
    className={`mt-2 text-[10px] ${
      msg.sender === "me"
        ? "text-black/60"
        : "text-zinc-500"
    }`}
  >
    Just now
  </div>

</motion.div>
              </motion.div>
            )
          )}
       
       {typing && (
  <div className="flex gap-3">

    <img
      src={activeChat.avatar}
      className="w-8 h-8 rounded-full"
    />

    <div className="rounded-3xl bg-zinc-800 px-5 py-4">

      <div className="flex gap-2">

        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />

        <span
          className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
          style={{ animationDelay: ".2s" }}
        />

        <span
          className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
          style={{ animationDelay: ".4s" }}
        />

      </div>

    </div>

  </div>
)} </motion.div>
  

        <div className="border-t border-white/5 bg-zinc-900 p-6">
          {attachment && (
            <div className="relative w-36 h-36 rounded-3xl overflow-hidden border border-yellow-500/20">

  {attachment.type === "video" ? (
    <video
      src={attachment.preview}
      controls
      className="w-full h-full object-cover"
    />
  ) : (
    <img
      src={attachment.preview}
      className="w-full h-full object-cover"
    />
  )}

  <button
    onClick={() => setAttachment(null)}
    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center"
  >
    <X size={14} />
  </button>

</div>
          )}

         <div className="flex items-center gap-4">

  <button
    onClick={() => fileInputRef.current?.click()}
    className="w-12 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
  >
    <Paperclip size={18} />
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
    placeholder={`Message ${activeChat.name}`}
    className="flex-1 rounded-2xl bg-black border border-white/5 px-6 py-4 outline-none focus:border-yellow-500"
  />

  <button
    onClick={sendMessage}
    className="w-12 h-12 rounded-2xl bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center text-black"
  >
    <Send size={18} />
  </button>

</div>
        </div>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}
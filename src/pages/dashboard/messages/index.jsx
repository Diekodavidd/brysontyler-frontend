/* eslint-disable no-unused-vars */

import {
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";

import {
  Send,
  Search,
  Paperclip,
  MoreVertical,
  X,
  CheckCircle2,
  Phone,
  Video,
  Circle,
} from "lucide-react";

import { motion } from "framer-motion";

import { useAuthStore } from "@/store/useAuthStore";
import { useConversations,
  useMessages,
  useSendMessage,useDiscoverCreators ,useDiscoverSubscribers} from "../../../hooks/useMesage";



export default function MessagesPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  /*
  =====================================
  API
  =====================================
  */

  const {
    data: conversationsData,
    isLoading: conversationsLoading,
  } = useConversations();

  const conversations =
    conversationsData?.conversations || [];

  /*
  =====================================
  ACTIVE CHAT
  =====================================
  */

  const [activeChat, setActiveChat] =
    useState(null);
const [mobileChatOpen, setMobileChatOpen] = useState(false);
  useEffect(() => {
    if (
      conversations.length &&
      !activeChat
    ) {
      setActiveChat(conversations[0]);
    }
  }, [conversations]);

  /*
  =====================================
  LOAD MESSAGES
  =====================================
  */

  const {
    data: messagesData,
    isLoading: messagesLoading,
  } = useMessages(activeChat?._id);

  const messages =
    messagesData?.messages || [];

  /*
  =====================================
  SEND MESSAGE
  =====================================
  */

  const sendMutation =
    useSendMessage();

  /*
  =====================================
  LOCAL UI
  =====================================
  */

  const [searchQuery, setSearchQuery] =
    useState("");

  const [inputText, setInputText] =
    useState("");

  const [attachment, setAttachment] =
    useState(null);
const [showCreators, setShowCreators] = useState(false);

const [selectedCreator, setSelectedCreator] =
  useState(null);
  const fileInputRef = useRef(null);

  const messagesEndRef =
    useRef(null);

  const {
    data: discoverData,
} = useDiscoverCreators(
    user.role === "fan"
);

const {
    data: fansData,
} = useDiscoverSubscribers(
    user.role === "creator"
);

const creators =
  discoverData?.creators || [];

  const fans =
  fansData?.fans || [];

  const discoverList =
    user.role === "fan"
        ? discoverData?.creators || []
        : fansData?.fans || [];

        const openConversation = (person) => {
  const existingConversation = conversations.find((c) => {
    if (user.role === "fan") {
      return c.creatorId?._id === person._id;
    }

    return c.fanId?._id === person._id;
  });

 if (existingConversation) {
  setActiveChat(existingConversation);
} else {
  setActiveChat({
    _id: null,
    creatorId: user.role === "creator" ? user : person,
    fanId: user.role === "creator" ? person : user,
  });
}

setMobileChatOpen(true);

  setShowCreators(false);
};
  /*
  =====================================
  SORT
  =====================================
  */
const getOtherUser = (conversation) => {
  return user.role === "creator"
    ? conversation.fanId
    : conversation.creatorId;
};
  const sortedConversations =
    useMemo(() => {
      return [...conversations].sort(
        (a, b) =>
          new Date(b.lastMessageAt) -
          new Date(a.lastMessageAt)
      );
    }, [conversations]);

  /*
  =====================================
  SEARCH
  =====================================
  */

  const filteredConversations =
    sortedConversations.filter((c) => {
      const creator =
        c.creatorId?.stageName ||
        c.creatorId?.name ||
        "";

      return (
        creator
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        (c.lastMessage || "")
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )
      );
    });

  /*
  =====================================
  SEND
  =====================================
  */

const sendMessage = async () => {
  if (!inputText.trim() && !attachment) return;

  try {
  const result = await sendMutation.mutateAsync({
    creatorId: activeChat.creatorId._id,
    fanId: activeChat.fanId?._id,
    text: inputText,
    attachment: attachment?.file,
});

// update active chat with the conversation returned
setActiveChat(result.conversation);

setInputText("");
setAttachment(null);
  } catch (err) {
    console.log(err);
  }
};
  /*
  =====================================
  ATTACHMENT
  =====================================
  */

  const handleFileChange = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setAttachment({
      file,

      preview:
        URL.createObjectURL(file),

      type:
        file.type.startsWith(
          "video"
        )
          ? "video"
          : "image",
    });
  };

  /*
  =====================================
  AUTO SCROLL
  =====================================
  */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [messages]);
  return (
<div className="flex h-[80vh] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900">
    {/* ===========================
        LEFT SIDEBAR
    ============================ */}

<div
  className={`${
    mobileChatOpen ? "hidden" : "flex"
  } w-full lg:flex lg:w-1/3 flex-col border-r border-white/5`}
>
      <div className="border-b border-white/5 p-6">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-3 top-3 text-zinc-500"
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
<div className="border-b border-white/5 p-6">

    <div className="relative">

        <Search
            size={16}
            className="absolute left-3 top-3 text-zinc-500"
        />

        <input
            
        />

    </div>

    <button
  onClick={() => setShowCreators(true)}
  className="mt-5 w-full rounded-2xl bg-yellow-500 py-3 font-black text-black hover:bg-yellow-400"
>
  {user.role === "fan"
    ? "Discover Creators"
    : "Discover Fans"}
</button>
{showCreators && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">

<div className="flex h-[92vh] w-[96%] max-w-7xl flex-col overflow-hidden rounded-2xl bg-zinc-950"
>

<div className="flex items-center justify-between border-b border-white/10 p-8">

<h2 className="text-3xl font-black">
  {user.role === "fan"
    ? "Discover Creators"
    : "Your Subscribers"}
</h2>

<button
onClick={() => setShowCreators(false)}
>

<X size={28} />

</button>

</div>

<div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
{discoverList.map((person) => (
<div
key={person._id}
className="rounded-3xl border border-white/5 bg-zinc-900 p-5"
>

<img
src={
person.profileImage ||
"https://placehold.co/120x120"
}
className="mx-auto h-24 w-24 rounded-full object-cover"
/>

<h3 className="mt-6 text-center text-2xl font-black">

{person.creatorApplication?.stageName ||
person.name}

</h3>

<p className="mt-3 text-center text-zinc-400">

{person.bio || "No bio available."}

</p>

{user.role === "creator" ? (

  <button
    className="mt-8 w-full rounded-2xl bg-yellow-500 py-3 font-black text-black"
    onClick={() => openConversation(person)}
  >
    Message Fan
  </button>

) : person.subscribed ? (

  <button
    className="mt-8 w-full rounded-2xl bg-yellow-500 py-3 font-black text-black"
    onClick={() => openConversation(person)}
  >
    Message Creator
  </button>

) : (

  <button
    className="mt-8 w-full rounded-2xl bg-zinc-700 py-3 font-black"
    onClick={() =>
      alert(
        "You must subscribe to this creator before messaging."
      )
    }
  >
    Subscribe First
  </button>

)}
</div>

))}

</div>

</div>

</div>

)}
</div>
      <div className="flex-1 overflow-y-auto">

        {conversationsLoading ? (

          <div className="p-8 text-center text-zinc-500">
            Loading conversations...
          </div>

        ) : filteredConversations.length === 0 ? (

          <div className="p-8 text-center text-zinc-500">
            No conversations found.
          </div>

        ) : (

          filteredConversations.map((conversation) => {

           const otherUser = getOtherUser(conversation);

            const unread =
              user.role === "creator"
                ? conversation.unreadCreator
                : conversation.unreadFan;

            const active =
              activeChat?._id ===
              conversation._id;

            return (

              <div
                key={conversation._id}
              onClick={() => {
  setActiveChat(conversation);
  setMobileChatOpen(true);
}}
                className={`cursor-pointer border-b border-white/5 p-5 transition ${
                  active
                    ? "border-l-4 border-l-yellow-500 bg-yellow-500/10"
                    : "hover:bg-white/5"
                }`}
              >

<div className="flex items-center gap-2 sm:gap-4">
                  <div className="relative">

                    <img
                      src={
                        otherUser?.profileImage ||
                        "https://placehold.co/80x80"
                      }
                      className="h-14 w-14 rounded-2xl object-cover"
                    />

                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-zinc-900 bg-green-500" />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex justify-between">

                      <div className="flex items-center gap-2">

                        <h3 className="truncate font-black">

                          {otherUser?.stageName || otherUser?.name}

                        </h3>

                        <CheckCircle2
                          size={16}
                          className="fill-sky-400 text-sky-400"
                        />

                      </div>

                      <span className="text-[11px] text-zinc-500">

                        {conversation.lastMessageAt
                          ? new Date(
                              conversation.lastMessageAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}

                      </span>

                    </div>

                    <p className="mt-1 text-xs text-yellow-400">

                      {user.role === "creator" ? "Fan" : "Creator"}

                    </p>

                    <div className="mt-2 flex items-center justify-between">

                      <p className="truncate text-sm text-zinc-400">

                        {conversation.lastMessage ||
                          "Start chatting"}

                      </p>

                      {unread > 0 && (

                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-[11px] font-black text-black">

                          {unread}

                        </span>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            );

          })

        )}

      </div>

    </div>

    {/* ===========================
        CHAT WINDOW
    ============================ */}

<div
  className={`${
    mobileChatOpen ? "flex" : "hidden"
  } w-full lg:flex lg:w-2/3 relative flex-col`}
>
      {activeChat && (

        <>

          <div className="flex items-center justify-between border-b border-white/5 bg-black/20 p-3 sm:p-5">

            <div className="flex items-center gap-4">

              <img
                src={
                  getOtherUser(activeChat)?.profileImage ||
                  "https://placehold.co/80x80"
                }
                className="h-14 w-14 rounded-2xl object-cover"
              />

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-xl font-black">

                    {getOtherUser(activeChat)?.stageName ||
getOtherUser(activeChat)?.name}

                  </h2>

                  <CheckCircle2
                    size={18}
                    className="fill-sky-400 text-sky-400"
                  />

                </div>

                <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500">

                  <Circle
                    size={8}
                    className="fill-green-500 text-green-500"
                  />

                  Online

                </p>

              </div>

            </div>

            {/* <div className="flex items-center gap-4">

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700">

                <Phone size={18} />

              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700">

                <Video size={18} />

              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700">

                <MoreVertical size={18} />

              </button>

            </div> */}
<button
  onClick={() => setMobileChatOpen(false)}
  className="mr-2 rounded-xl bg-zinc-800 p-2 lg:hidden"
>
  ←
</button>
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
    duration: 0.25,
  }}
className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-6 lg:p-8">

  {messagesLoading ? (

    <div className="text-center text-zinc-500">
      Loading messages...
    </div>

  ) : messages.length === 0 ? (

    <div className="text-center text-zinc-500">
      No messages yet.
    </div>

  ) : (

    messages.map((msg) => {

      const mine =
        msg.sender === user._id ||
        msg.sender?._id === user._id;

      return (

        <motion.div
          key={msg._id}
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
          className={`flex gap-4 ${
            mine
              ? "justify-end"
              : ""
          }`}
        >

          {!mine && (

            <img
              src={
                getOtherUser(activeChat)?.profileImage ||
                "https://placehold.co/40x40"
              }
className="h-10 w-10 sm:h-14 sm:w-14 rounded-2xl object-cover"            />

          )}

          <div
className={`max-w-[85%] sm:max-w-md rounded-3xl px-4 py-3 ${
                mine
                ? "rounded-br-md bg-yellow-500 text-black"
                : "rounded-bl-md bg-zinc-800"
            }`}
          >

            {msg.attachment?.url && (

              <div className="mb-3 overflow-hidden rounded-2xl">

                {msg.messageType ===
                "video" ? (

                  <video
                    controls
                    src={
                      msg.attachment.url
                    }
className="max-h-52 w-full rounded-2xl object-cover"                  />

                ) : (

                  <img
                    src={
                      msg.attachment.url
                    }
className="max-h-52 w-full rounded-2xl object-cover"                  />

                )}

              </div>

            )}

            {!!msg.text && (
              <p>{msg.text}</p>
            )}

            <div
              className={`mt-2 text-[10px] ${
                mine
                  ? "text-black/60"
                  : "text-zinc-500"
              }`}
            >

              {new Date(
                msg.createdAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}

            </div>

          </div>

        </motion.div>

      );

    })

  )}

  <div ref={messagesEndRef} />

</motion.div>

<div className="border-t border-white/5 bg-zinc-900 p-3 sm:p-5">

  {attachment && (

    <div className="relative mb-4 h-36 w-36 overflow-hidden rounded-3xl border border-yellow-500/20">

      {attachment.type ===
      "video" ? (

        <video
          controls
          src={attachment.preview}
          className="h-full w-full object-cover"
        />

      ) : (

        <img
          src={attachment.preview}
          className="h-full w-full object-cover"
        />

      )}

      <button
        onClick={() =>
          setAttachment(null)
        }
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70"
      >
        <X size={14} />
      </button>

    </div>

  )}

<div className="hidden sm:flex items-center gap-3">
    <button
      onClick={() =>
        fileInputRef.current?.click()
      }
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 hover:bg-zinc-700"
    >

      <Paperclip size={18} />

    </button>

    <input
      ref={fileInputRef}
      hidden
      type="file"
      accept="image/*,video/*"
      onChange={handleFileChange}
    />

    <input
      value={inputText}
      onChange={(e) =>
        setInputText(
          e.target.value
        )
      }
      onKeyDown={(e) =>
        e.key === "Enter" &&
        sendMessage()
      }
      placeholder={`Message ${
  getOtherUser(activeChat)?.stageName ||
  getOtherUser(activeChat)?.name ||
  ""
}`}
className="flex-1 rounded-2xl border border-white/5 bg-black px-4 py-3 text-sm sm:px-6 sm:py-4"    />

    <button
      disabled={
        sendMutation.isPending
      }
      onClick={sendMessage}
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500 text-black hover:bg-yellow-400"
    >

      <Send size={18} />

    </button>

  </div>

</div>

</>

)}

</div>

</div>

);
}
  
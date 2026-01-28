"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  SendIcon,
  GalleryIcon,
  DoubleCheckIcon,
} from "./_components/ChatIcons";

const ChatPage = () => {
  const router = useRouter();

  const messages = [
    {
      id: 1,
      type: "system",
      content: "John stated a topic:",
      subcontent: '"How was your day?"',
    },
    {
      id: 2,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content:
        "Hey Alice! I'm good, just trying to wrap my head around our FYP.",
      isSelf: true,
    },
    {
      id: 3,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content: "How about you?",
      isSelf: true,
    },
    {
      id: 4,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content:
        "I've been thinking a lot about how we can really make PastForward stand out.",
      isSelf: false,
    },
    {
      id: 5,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content: "Oh, definitely.",
      isSelf: true,
    },
    {
      id: 6,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content:
        "We need to make sure it's more than just another messaging app. Any ideas on what we should focus on first?",
      isSelf: true,
    },
    {
      id: 7,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content:
        "Well, I was thinking about the messaging and scheduling modules. They're pretty core to our app, and we need them to work seamlessly.",
      isSelf: false,
    },
    {
      id: 8,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content:
        "Perfect. I'll bring my laptop and some design tools. See you then!",
      isSelf: true,
    },
    {
      id: 9,
      sender: "Alice Smith",
      avatar: "/chat-avatar-alice.png",
      content: "😃",
      isSelf: false,
      isEmoji: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col font-sans p-4 md:p-8 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/login.png"
        alt="Background"
        fill
        className="object-cover pointer-events-none -z-10"
        priority
      />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="relative z-10 w-[124px] h-[48px] bg-[#222222] text-white rounded-[12px] text-[16px] font-medium hover:bg-[#333333] transition-colors border border-white/5 active:scale-95 mb-6 shadow-lg"
      >
        Back
      </button>

      {/* Chat Container */}
      <div className="relative z-10 flex-1 border border-white/10 rounded-[12px] flex flex-col overflow-hidden bg-transparent backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 md:p-6 flex items-center gap-4 border-b border-white/5">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden relative border border-white/10">
            <Image
              src="/chat-avatar-alice.png"
              alt="Alice"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-[16px] font-bold">Alice Smith</h1>
            <span className="text-[#8C8C8C] text-[12px]">
              active 1 minutes ago
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 flex flex-col gap-6 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <div
                  key={msg.id}
                  className="flex flex-col items-center gap-1 my-6"
                >
                  <span className="text-[#8C8C8C] text-[13px] font-semibold">
                    {msg.content}
                  </span>
                  <span className="text-[#8C8C8C] text-[14px] font-medium italic">
                    {msg.subcontent}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-center gap-3 ${
                  msg.isSelf ? "justify-end" : "justify-start"
                }`}
              >
                {!msg.isSelf && (
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src={msg.avatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Message Layout */}
                <div className="flex items-center gap-2">
                  {/* Double Tick for Self (Left of bubble) */}
                  {msg.isSelf && !msg.isEmoji && (
                    <div className="shrink-0">
                      <DoubleCheckIcon className="w-[15px] h-[15px]" />
                    </div>
                  )}

                  <div
                    className={`px-5 py-3 rounded-[24px] ${
                      msg.isSelf
                        ? "bg-[#582BB3] text-white"
                        : msg.isEmoji
                          ? ""
                          : "bg-[#262626] text-white"
                    } ${
                      msg.isEmoji
                        ? "text-[44px] px-0 py-0"
                        : "text-[15px] leading-relaxed"
                    } max-w-[650px]`}
                  >
                    {msg.content}
                  </div>
                </div>

                {msg.isSelf && (
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/chat-avatar-user.png"
                      alt="Self"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Typing Section */}
        <div className="p-4 md:p-8 pt-4">
          <div className="bg-[#1A1A1A] h-[68px] rounded-full flex items-center px-4 md:px-6 gap-4 w-full border border-white/5">
            <button className="text-[#FFBD1D] hover:scale-110 transition-transform shrink-0">
              <GalleryIcon className="w-[24px] h-[24px]" />
            </button>
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-[#666666] text-[16px] font-sans h-full"
            />
            <button className="text-[#FFBD1D] hover:scale-110 transition-transform shrink-0">
              <SendIcon className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SendIcon,
  GalleryIcon,
  DoubleCheckIcon,
} from "./_components/ChatIcons";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

const ChatContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "Alice Smith";
  const userId = searchParams.get("id"); // recipientId

  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Helper to get timestamp in millis
  const getTime = (t) => {
    if (!t) return 0;
    if (t.toMillis) return t.toMillis();
    if (t instanceof Date) return t.getTime();
    return new Date(t).getTime();
  };

  // Combined messages for display, filtering duplicates
  const allMessages = [
    ...messages,
    ...pendingMessages.filter(pMsg =>
      !messages.some(msg => msg.content === pMsg.content && msg.senderId === pMsg.senderId)
    )
  ].sort((a, b) => {
    return getTime(a.timestamp) - getTime(b.timestamp);
  });

  // Scroll to bottom on innovative messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const [currentAdminId, setCurrentAdminId] = useState(null);

  // Fetch current admin ID for conversation logic
  useEffect(() => {
    // We can fetch via API or assume we have it. Let's fetch session info or pass it.
    // For now, let's fetch session via a lightweight API call or assume client-side auth state if available.
    // Since this is "admin", we can fetch /api/auth/me or similar.
    // Or simpler: let the first message send determine it? No, we need to LISTEN.
    // Let's create a quick way to get my ID. Actually, we can get it from a server component wrapper or context.
    // For simplicity in this `suspense` client component, let's fetch it.

    // Better: use a server action to get UID? Or reuse an existing auth hook if present.
    // Let's fetch from a new endpoint or use existing auth API.
    // Assuming we don't have a ready hook, let's fetch session.

    fetch("/api/admin/auth/me").then(res => {
      if (res.ok) return res.json();
      return null;
    }).then(data => {
      if (data?.uid) setCurrentAdminId(data.uid);
    });
  }, []);

  // Listen for real-time messages
  useEffect(() => {
    if (!userId || !currentAdminId) return;

    // Construct Conversation ID
    const participants = [currentAdminId, userId].sort();
    const conversationId = participants.join("_");

    // Listen to subcollection: conversations/{conversationId}/messages
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, currentAdminId]);

  const handleSendMessage = async () => {
    if (!input.trim() || !userId) return;

    const contentToUse = input;
    setInput(""); // Clear immediately

    // Create optimistic message
    const tempId = "temp-" + Date.now();
    const optimisticMsg = {
      id: tempId,
      content: contentToUse,
      senderId: currentAdminId,
      timestamp: new Date(),
      type: "text",
      pending: true,
      read: false
    };

    setPendingMessages(prev => [...prev, optimisticMsg]);

    try {
      // Optimistic update (optional, relying on fast Firestore sync here)
      // Call Server API to send message securely (and potentially handle server-side logic like notifications)
      const res = await fetch("/api/admin/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: userId,
          content: contentToUse,
          type: "text" // Default type
        }),
      });

      if (res.ok) {
        // Remove specific pending message once sent
        setPendingMessages(prev => prev.filter(m => m.id !== tempId));
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error calling send API:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col font-sans p-4 md:p-8 overflow-hidden bg-black/90 backdrop-blur-md">
      {/* Background Image */}
      <Image
        src="/login.png"
        alt="Background"
        fill
        className="object-cover pointer-events-none -z-10 opacity-30"
        priority
      />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="relative z-10 w-[124px] rounded-[10px] bg-white/10 h-[48px] text-white text-[16px] font-medium border border-white/5 active:scale-95 mb-6 shadow-lg flex items-center justify-center gap-2"
      >
        <span>Back</span>
      </button>

      {/* Chat Container */}
      <div className="relative z-10 flex-1 border border-white/10 rounded-none flex flex-col overflow-hidden bg-transparent">
        {/* Header */}
        <div className="p-4 md:p-6 flex items-center gap-4 border-b border-white/5">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden relative border border-white/10">
            <Image
              src="/chat-avatar-alice.png" // Should ideally fetch real avatar
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-[18px] font-bold">{userName}</h1>
            <span className="text-[#8C8C8C] text-[12px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              active now
            </span>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 flex flex-col gap-6 scrollbar-hide">
          {loading && (
            <div className="flex items-center justify-center text-gray-500 py-10">
              Loading conversation...
            </div>
          )}

          {!loading && allMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-500 py-10 gap-2">
              <p>No messages yet.</p>
              <p className="text-sm">Start the conversation below.</p>
            </div>
          )}

          {allMessages.map((msg) => {
            const isMe = msg.senderId === currentAdminId;

            if (msg.type === "system") {
              return (
                <div
                  key={msg.id}
                  className="flex flex-col items-center gap-1 my-6"
                >
                  <span className="text-[#8C8C8C] text-[13px] font-semibold">
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-center gap-3 ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/chat-avatar-alice.png" // Placeholder
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div className="flex items-center gap-2">
                  {/* Read Receipt (Double Check) for Self */}
                  {isMe && !msg.pending && (
                    <div className="shrink-0 text-white/50">
                      {msg.read ? (
                        <DoubleCheckIcon className="w-[15px] h-[15px] text-[#582BB3]" />
                      ) : (
                        <DoubleCheckIcon className="w-[15px] h-[15px] text-gray-500" />
                      )}
                    </div>
                  )}

                  <div
                    className={`px-5 py-3 rounded-[24px] ${isMe
                      ? "bg-[#582BB3] text-white rounded-br-none"
                      : "bg-[#262626] text-white rounded-bl-none"
                      } text-[15px] leading-relaxed shadow-sm max-w-[650px] broke-words whitespace-pre-wrap ${msg.pending ? 'opacity-70' : ''}`}
                  >
                    {msg.content}
                  </div>
                </div>

                {isMe && (
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative shrink-0 border border-white/10">
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-white/5">
          <div className="bg-[#1A1A1A] h-[60px] rounded-full flex items-center px-4 md:px-6 gap-4 w-full border border-white/10 focus-within:border-[#582BB3] transition-colors">
            <button className="text-[#FFBD1D] hover:scale-110 transition-transform shrink-0 p-2">
              <GalleryIcon className="w-[20px] h-[20px]" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${userName}...`}
              className="flex-1 bg-transparent text-white outline-none placeholder:text-[#666666] text-[16px] font-sans h-full"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="text-[#FFBD1D] hover:scale-110 transition-transform shrink-0 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center text-white">
        Loading chat...
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}

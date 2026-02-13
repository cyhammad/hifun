"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SendIcon,
  GalleryIcon,
  DoubleCheckIcon,
} from "./_components/ChatIcons";
import { db, storage } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const ChatContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "Alice Smith";
  const userId = searchParams.get("id"); // recipientId
  const disputeId = searchParams.get("disputeId");

  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Image upload states
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Image modal states
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState(null);

  // Allowed image types
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

  // Helper to get timestamp as unix seconds for sorting
  const getTime = (t) => {
    if (!t) return 0;
    if (typeof t === "number") return t; // already unix seconds
    if (t.toMillis) return Math.floor(t.toMillis() / 1000); // Firestore Timestamp
    if (t instanceof Date) return Math.floor(t.getTime() / 1000);
    return Math.floor(new Date(t).getTime() / 1000);
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
  const [adminAvatar, setAdminAvatar] = useState("/chat-avatar-user.png");
  const [recipientAvatar, setRecipientAvatar] = useState("/chat-avatar-alice.png");

  // Fetch current admin ID and avatar
  useEffect(() => {
    fetch("/api/admin/auth/me").then(res => {
      if (res.ok) return res.json();
      return null;
    }).then(data => {
      if (data?.uid) {
        setCurrentAdminId(data.uid);
        if (data.photoURL) setAdminAvatar(data.photoURL);
      }
    });
  }, []);

  // Fetch recipient avatar
  useEffect(() => {
    if (!userId) return;

    const fetchRecipient = async () => {
      try {
        // Try fetching from users collection
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check various possible avatar fields
          const avatar = userData.photoURL || userData.avatar || userData.profileImage || "/chat-avatar-alice.png";
          setRecipientAvatar(avatar);
        }
      } catch (error) {
        console.error("Error fetching recipient avatar:", error);
      }
    };

    fetchRecipient();
  }, [userId]);

  // Listen for real-time messages
  useEffect(() => {
    if (!userId || !currentAdminId) return;

    // Construct Conversation ID
    let conversationId;

    if (disputeId) {
      conversationId = disputeId;
      // Ensure conversation document exists for dispute
      const convoRef = doc(db, "conversations", conversationId);
      // We don't await this to keep UI responsive, but we log errors
      setDoc(convoRef, {
        participants: [currentAdminId, userId],
        type: 'dispute',
        disputeId: disputeId,
        updatedAt: Date.now() // Update timestamp to keep it fresh
      }, { merge: true }).catch(err => console.error("Error creating/updating dispute conversation:", err));
    } else {
      const participants = [currentAdminId, userId].sort();
      conversationId = participants.join("_");
    }

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
  }, [userId, currentAdminId, disputeId]);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, WebP, or SVG)");
      e.target.value = "";
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setSelectedImagePreview(previewUrl);
    e.target.value = ""; // Reset input for re-selection
  };

  // Remove selected image
  const handleRemoveImage = () => {
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
    }
    setSelectedImage(null);
    setSelectedImagePreview(null);
  };

  // Upload image to Firebase Storage
  const uploadImageToStorage = async (file) => {
    const timestamp = Date.now();
    const fileName = `chat_images/${currentAdminId}_${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSendMessage = async () => {
    // Allow sending if there's text OR image
    if ((!input.trim() && !selectedImage) || !userId) return;

    const contentToUse = input.trim();
    const imageToUpload = selectedImage;
    const imagePreviewUrl = selectedImagePreview;

    // Clear inputs immediately
    setInput("");
    handleRemoveImage();

    // Determine message type
    let messageType = "text";
    if (imageToUpload && contentToUse) {
      messageType = "image_text";
    } else if (imageToUpload) {
      messageType = "image";
    }

    // Create optimistic message with unix seconds timestamp
    const tempId = "temp-" + Date.now();
    const optimisticMsg = {
      id: tempId,
      content: contentToUse || "",
      senderId: currentAdminId,
      timestamp: Math.floor(Date.now() / 1000),
      type: messageType,
      pending: true,
      read: false,
      imageUrl: imagePreviewUrl || null // Use local preview for optimistic UI
    };

    setPendingMessages(prev => [...prev, optimisticMsg]);
    setUploadingImage(!!imageToUpload);

    try {
      let imageUrl = null;

      // Upload image if present
      if (imageToUpload) {
        imageUrl = await uploadImageToStorage(imageToUpload);
      }

      // Call Server API to send message
      const res = await fetch("/api/admin/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: userId,
          content: contentToUse || (imageUrl ? "📷 Image" : ""),
          type: messageType,
          imageUrl: imageUrl,
          disputeId: disputeId
        }),
      });

      if (res.ok) {
        setPendingMessages(prev => prev.filter(m => m.id !== tempId));
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex flex-col font-sans p-4 md:p-8 overflow-hidden bg-black/90 backdrop-blur-md">
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
              src={recipientAvatar}
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
                      src={recipientAvatar}
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
                    className={`rounded-[24px] ${isMe
                      ? "bg-[#582BB3] text-white rounded-br-none"
                      : "bg-[#262626] text-white rounded-bl-none"
                      } shadow-sm max-w-[650px] ${msg.pending ? 'opacity-70' : ''} overflow-hidden`}
                  >
                    {/* Image Display */}
                    {msg.imageUrl && (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setPreviewModalImage(msg.imageUrl);
                          setPreviewModalOpen(true);
                        }}
                      >
                        <img
                          src={msg.imageUrl}
                          alt="Shared image"
                          className="max-w-[300px] max-h-[200px] object-cover rounded-t-[24px] hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    {msg.content && msg.type !== "image" && (
                      <div className={`px-5 py-3 text-[15px] leading-relaxed break-words whitespace-pre-wrap`}>
                        {msg.content}
                      </div>
                    )}

                    {/* Image-only message padding */}
                    {msg.type === "image" && !msg.content && (
                      <div className="h-1"></div>
                    )}
                  </div>
                </div>

                {isMe && (
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden relative shrink-0 border border-white/10">
                    <Image
                      src={adminAvatar}
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
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
            className="hidden"
          />

          {/* Image Preview */}
          {selectedImagePreview && (
            <div className="mb-3 flex items-center gap-2">
              <div className="relative inline-block">
                <img
                  src={selectedImagePreview}
                  alt="Selected image preview"
                  className="h-16 w-16 object-cover rounded-lg border border-white/20"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <span className="text-white/60 text-sm">
                {selectedImage?.name}
              </span>
            </div>
          )}

          <div className={`bg-[#1A1A1A] ${selectedImagePreview ? 'h-[60px]' : 'h-[60px]'} rounded-full flex items-center px-4 md:px-6 gap-4 w-full border border-white/10 focus-within:border-[#582BB3] transition-colors`}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[#FFBD1D] hover:scale-110 transition-transform shrink-0 p-2"
              title="Attach image"
            >
              <GalleryIcon className="w-[20px] h-[20px]" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedImagePreview ? "Add a caption (optional)..." : `Message ${userName}...`}
              className="flex-1 bg-transparent text-white outline-none placeholder:text-[#666666] text-[16px] font-sans h-full"
            />
            <button
              onClick={handleSendMessage}
              disabled={(!input.trim() && !selectedImage) || uploadingImage}
              className="text-[#FFBD1D] hover:scale-110 transition-transform shrink-0 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              {uploadingImage ? (
                <div className="w-[20px] h-[20px] border-2 border-[#FFBD1D] border-t-transparent rounded-full animate-spin" />
              ) : (
                <SendIcon className="w-[20px] h-[20px]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] p-0 bg-black/95 border-white/10">
          <DialogHeader className="hidden">
            <DialogTitle>Media Preview</DialogTitle>
          </DialogHeader>
          <div className="relative flex items-center justify-center min-h-[50vh] max-h-[90vh] p-4">
            {previewModalImage && (
              <img
                src={previewModalImage}
                alt="Full size preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
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

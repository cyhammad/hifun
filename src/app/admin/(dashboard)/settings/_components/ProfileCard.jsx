"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function formatJoinedDate(creationTime) {
  if (!creationTime) return "—";
  try {
    const date = new Date(creationTime);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

// Get initials from name (first letter of first name)
function getInitial(name) {
  if (!name) return "A";
  return name.charAt(0).toUpperCase();
}

// Generate a gradient based on the name for visual variety
function getGradientFromName(name) {
  const gradients = [
    "from-purple-500 to-indigo-600",
    "from-pink-500 to-rose-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-violet-500 to-purple-600",
  ];

  if (!name) return gradients[0];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export function ProfileCard({ user }) {
  const displayName = user?.displayName || "Admin";
  const email = user?.email || "—";
  const joined = formatJoinedDate(user?.creationTime);
  const photoURL = user?.photoURL;

  const [currentPhotoURL, setCurrentPhotoURL] = useState(photoURL);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Allowed image types
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select a valid image (JPEG, PNG, GIF, or WebP)");
      e.target.value = "";
      return;
    }

    // Validate file size (max 2MB for profile images)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      e.target.value = "";
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Upload to Firebase Storage
      const timestamp = Date.now();
      const fileName = `admin_avatars/${user.uid}_${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update profile in Firebase Auth via API
      const res = await fetch("/api/admin/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoURL: downloadURL }),
      });

      if (res.ok) {
        setCurrentPhotoURL(downloadURL);
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const initial = getInitial(displayName);
  const gradient = getGradientFromName(displayName);

  return (
    <div className="w-[250px] bg-transparent border border-[#404040] rounded-[16px] p-[24px] flex flex-col font-roboto">
      <div className="flex flex-col items-center pb-6">
        {/* Avatar Container with Upload Button */}
        <div className="relative group mb-4">
          <div className="w-[120px] h-[120px] rounded-[12px] overflow-hidden relative border border-[#404040]">
            {currentPhotoURL ? (
              <Image
                src={currentPhotoURL}
                alt="Admin Avatar"
                fill
                className="object-cover"
              />
            ) : (
              /* Fallback: First letter with gradient background */
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                <span className="text-white text-[48px] font-bold select-none">
                  {initial}
                </span>
              </div>
            )}

            {/* Loading overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Upload button overlay */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors rounded-[12px] cursor-pointer group"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1">
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white text-[10px] font-medium">Change Photo</span>
            </div>
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
          />
        </div>

        {/* Error message */}
        {error && (
          <span className="text-red-400 text-[11px] text-center mb-2">{error}</span>
        )}

        <span className="text-white text-[18px] font-semibold">{displayName}</span>
      </div>

      <div className="w-full h-px bg-[#404040] mb-6" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[#717171] text-[12px] font-normal">Email</span>
          <span className="text-white text-[14px] font-normal">{email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#717171] text-[12px] font-normal">Joined</span>
          <span className="text-white text-[14px] font-normal">{joined}</span>
        </div>
      </div>
    </div>
  );
}


"use client";

import React from "react";
import Image from "next/image";

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

export function ProfileCard({ user }) {
  const displayName = user?.displayName || "Admin";
  const email = user?.email || "—";
  const joined = formatJoinedDate(user?.creationTime);

  return (
    <div className="w-[250px] bg-transparent border border-[#404040] rounded-[16px] p-[24px] flex flex-col font-roboto">
      <div className="flex flex-col items-center pb-6">
        <div className="w-[120px] h-[120px] rounded-[12px] overflow-hidden relative mb-4 border border-[#404040]">
          <Image
            src="/admin-avatar.png"
            alt="Admin Avatar"
            fill
            className="object-cover"
          />
        </div>
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

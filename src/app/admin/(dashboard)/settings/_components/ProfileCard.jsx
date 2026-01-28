"use client";

import React from "react";
import Image from "next/image";

export function ProfileCard() {
  return (
    <div className="w-[250px] bg-transparent border border-[#404040] rounded-[16px] p-[24px] flex flex-col font-roboto">
      {/* Avatar and Name Section */}
      <div className="flex flex-col items-center pb-6">
        <div className="w-[120px] h-[120px] rounded-[12px] overflow-hidden relative mb-4 border border-[#404040]">
          <Image
            src="/admin-avatar.png"
            alt="Admin Avatar"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-white text-[18px] font-semibold">Admin</span>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#404040] mb-6" />

      {/* Info Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[#717171] text-[12px] font-normal">Email</span>
          <span className="text-white text-[14px] font-normal">
            Ameanda@mail.com
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#717171] text-[12px] font-normal">Joined</span>
          <span className="text-white text-[14px] font-normal">
            12 December 2022
          </span>
        </div>
      </div>
    </div>
  );
}

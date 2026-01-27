"use client";

import React from "react";
import Image from "next/image";
import { BellIcon } from "@/components/icons/icons";

import { MobileSidebar } from "./sidebar/DashboardSidebar";

export default function DashboardTopbar() {
  return (
    <header className="h-[72px] w-full bg-transparent border-b border-[#404040] flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Trigger */}
        <MobileSidebar />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <BellIcon className="w-6 h-6 text-[#FFBD1D]" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FF4B4B] rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
}

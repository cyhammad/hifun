"use client";

import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";

export function PersonalDetailsCard({ user }) {
  const [showPassword, setShowPassword] = useState(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Admin";
  const email = user?.email || "—";

  return (
    <div className="flex flex-col gap-6 flex-1 font-roboto">
      <h2
        className="text-white text-[24px] font-semibold"
        style={{ fontFamily: "var(--font-red-hat-display)" }}
      >
        Personal Details
      </h2>

      <div className="bg-transparent border border-[#404040] rounded-[16px] p-[24px] flex flex-col gap-6 w-full">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2 min-w-[180px]">
            <span className="text-[#717171] text-[12px] font-normal">Name</span>
            <span className="text-white text-[16px] font-normal">{displayName}</span>
          </div>

          <div className="flex flex-col gap-2 min-w-[180px]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#717171]" />
              <span className="text-[#717171] text-[12px] font-normal">Email</span>
            </div>
            <span className="text-white text-[16px] font-normal">{email}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#717171] text-[12px] font-normal">Password</span>
          <div className="flex items-center justify-between">
            <span className="text-white text-[16px] font-normal tracking-widest">
              {showPassword ? "••••••••••" : "••••••••••"}
            </span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#717171] hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-[#717171] text-[12px] mt-1">
            Password is managed by Firebase Auth. Change it in your account settings.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="w-fit px-8 h-[44px] bg-[#582BB3] hover:bg-[#7245f0] text-white font-medium text-[14px] rounded-[24px] transition-all active:scale-[0.98]"
      >
        Edit Details
      </button>
    </div>
  );
}

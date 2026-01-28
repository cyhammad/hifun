"use client";

import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";

export function PersonalDetailsCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-6 flex-1 font-roboto">
      {/* Title */}
      <h2
        className="text-white text-[24px] font-semibold"
        style={{ fontFamily: "var(--font-red-hat-display)" }}
      >
        Personal Details
      </h2>

      {/* Form Card */}
      <div className="bg-transparent border border-[#404040] rounded-[16px] p-[24px] flex flex-col gap-6 w-full">
        {/* Name and Email Row */}
        <div className="flex flex-wrap gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2 min-w-[180px]">
            <span className="text-[#717171] text-[12px] font-normal">Name</span>
            <span className="text-white text-[16px] font-normal">John Doe</span>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 min-w-[180px]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#717171]" />
              <span className="text-[#717171] text-[12px] font-normal">
                Email
              </span>
            </div>
            <span className="text-white text-[16px] font-normal">
              abc@gmail.com
            </span>
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <span className="text-[#717171] text-[12px] font-normal">
            Password
          </span>
          <div className="flex items-center justify-between">
            <span className="text-white text-[16px] font-normal tracking-widest">
              {showPassword ? "mypassword123" : "••••••••••"}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#717171] hover:text-white transition-colors"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Details Button */}
      <button className="w-fit px-8 h-[44px] bg-[#582BB3] hover:bg-[#7245f0] text-white font-medium text-[14px] rounded-[24px] transition-all active:scale-[0.98]">
        Edit Details
      </button>
    </div>
  );
}

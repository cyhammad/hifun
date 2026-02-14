"use client";

import React from "react";
import { TotalUsersIcon, TotalProfitsIcon } from "@/components/icons/icons";

const ICON_MAP = {
  totalUsers: TotalUsersIcon,
  totalProfits: TotalProfitsIcon,
};

const KPICard = ({
  title,
  value,
  percentage,
  icon,
  iconBgColor = "bg-[#582BB3]",
  iconColor = "text-white",
  customIcon,
}) => {
  const Icon = typeof icon === "string" ? ICON_MAP[icon] : icon;

  return (
    <div className="bg-[#080707] w-full h-[135px] rounded-[16px] p-[16px] flex flex-col justify-between border-[1.5px] border-[#404040] font-sans">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[#8C8C8C] text-[16px] font-medium mb-[6px]">
            {title}
          </p>
          <p className="text-[32px] font-bold text-white leading-none">
            {value}
          </p>
        </div>
        <div
          className={`w-[44px] h-[44px] ${iconBgColor} rounded-full flex items-center justify-center shrink-0 border border-white/5 shadow-lg`}
        >
          {Icon && (
            <div className={iconColor}>
              <Icon className="w-[24px] h-[24px]" />
            </div>
          )}
          {customIcon && customIcon}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-white text-[14px] font-bold">{percentage}</span>
      </div>
    </div>
  );
};

export default KPICard;

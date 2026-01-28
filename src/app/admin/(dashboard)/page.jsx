"use client";

import React from "react";
import KPICard from "@/components/dashboard/KPICard";

import { NewUsersTable } from "@/components/dashboard/NewUsersTable";
import { TotalUsersIcon, TotalProfitsIcon } from "@/components/icons/icons";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 py-6 md:py-[32px] px-4 md:px-6 min-h-full">
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-semibold text-white"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-[24px]">
        <div className="flex-1 min-w-[300px]">
          <KPICard
            title="Total Users"
            value="500+"
            percentage="+ 20%"
            icon={TotalUsersIcon}
            iconBgColor="bg-[#582BB3]"
            iconColor="text-white"
          />
        </div>
        <div className="flex-1 min-w-[300px]">
          <KPICard
            title="Total Profits"
            value="$500+"
            percentage="+ 20%"
            icon={TotalProfitsIcon}
            iconBgColor="bg-[#582BB3]"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* New Users Table Section */}
      <div className="w-full">
        <NewUsersTable />
      </div>
    </div>
  );
};

export default DashboardPage;

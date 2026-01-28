"use client";

import React from "react";
import KPICard from "@/components/dashboard/KPICard";
import { TotalUsersIcon, TotalProfitsIcon } from "@/components/icons/icons";
import { TotalEarningsChart } from "./_components/TotalEarningsChart";
import { TopUsersCard } from "./_components/TopUsersCard";
import { UsersRegisteredChart } from "./_components/UsersRegisteredChart";

const AnalyticsPage = () => {
  return (
    <div className="flex flex-col gap-6 py-[32px] px-[24px] min-h-full">
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold text-white"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          Analytics
        </h1>
      </div>

      {/* Row 1: KPI Cards */}
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
            value="$5,000+"
            percentage="+ 15%"
            icon={TotalProfitsIcon}
            iconBgColor="bg-[#582BB3]"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* Row 2: Earnings Chart & Top Users */}
      <div className="flex flex-row gap-[24px] w-full">
        <div className="flex-1">
          <TotalEarningsChart />
        </div>
        <div className="flex-1">
          <TopUsersCard />
        </div>
      </div>

      {/* Row 3: Users Registered */}
      <div className="w-full flex justify-start">
        <UsersRegisteredChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;

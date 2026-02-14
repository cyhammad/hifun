import React from "react";
import KPICard from "@/components/dashboard/KPICard";
import { TotalEarningsChart } from "./_components/TotalEarningsChart";
import { TopUsersCard } from "./_components/TopUsersCard";
import { UsersRegisteredChart } from "./_components/UsersRegisteredChart";
import { adminDb } from "@/lib/firebase-admin";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

function toDate(value) {
  if (!value) return null;
  if (value?.toDate && typeof value.toDate === "function") return value.toDate();
  const ms = typeof value === "number" ? (value < 1e12 ? value * 1000 : value) : new Date(value).getTime();
  return isNaN(ms) ? null : new Date(ms);
}

async function getAnalyticsData() {
  try {
    const totalUsersSnapshot = await adminDb.collection("users").count().get();
    const totalUsers = totalUsersSnapshot.data().count;

    const usersSnapshot = await adminDb
      .collection("users")
      .orderBy("createdAt", "asc")
      .get();

    const now = new Date();
    const byMonth = {};
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth[key] = { month: MONTH_NAMES[d.getMonth()], users: 0 };
    }

    usersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const date = toDate(data.createdAt);
      if (!date) return;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (byMonth[key]) byMonth[key].users += 1;
    });

    const chartData = Object.keys(byMonth)
      .sort()
      .map((k) => byMonth[k]);

    return { totalUsers, chartData };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalUsers: 0,
      chartData: MONTH_NAMES.map((month) => ({ month, users: 0 })),
    };
  }
}

const AnalyticsPage = async () => {
  const { totalUsers, chartData } = await getAnalyticsData();

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
            value={totalUsers.toLocaleString()}
            percentage="+ 20%"
            icon="totalUsers"
            iconBgColor="bg-[#582BB3]"
            iconColor="text-white"
          />
        </div>
        <div className="flex-1 min-w-[300px]">
          <KPICard
            title="Total Profits"
            value="$5,000+"
            percentage="+ 15%"
            icon="totalProfits"
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
        <UsersRegisteredChart data={chartData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

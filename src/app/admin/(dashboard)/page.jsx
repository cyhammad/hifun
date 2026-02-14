import React from "react";
import KPICard from "@/components/dashboard/KPICard";
import { NewUsersTable } from "@/components/dashboard/NewUsersTable";
import { adminDb } from "@/lib/firebase-admin";

// Helper to format timestamp
function formatDate(timestamp) {
  if (!timestamp) return "Unknown";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Fetch dashboard data
async function getDashboardData() {
  try {
    // 1. Get total users count (simplified approach - for large scale use a counter doc)
    const usersSnapshot = await adminDb.collection("users").count().get();
    const totalUsers = usersSnapshot.data().count;

    // 2. Get recent users (limit 5)
    const recentUsersSnapshot = await adminDb
      .collection("users")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const recentUsers = recentUsersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Unknown",
        email: data.email || "No email",
        joinedDate: formatDate(data.createdAt),
      };
    });

    return {
      totalUsers,
      recentUsers,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      totalUsers: 0,
      recentUsers: [],
    };
  }
}

const DashboardPage = async () => {
  const { totalUsers, recentUsers } = await getDashboardData();

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
            value={`${totalUsers}+`}
            percentage="+ 20%"
            icon="totalUsers"
            iconBgColor="bg-[#582BB3]"
            iconColor="text-white"
          />
        </div>
        <div className="flex-1 min-w-[300px]">
          <KPICard
            title="Total Profits"
            value="$500+"
            percentage="+ 20%"
            icon="totalProfits"
            iconBgColor="bg-[#582BB3]"
            iconColor="text-white"
          />
        </div>
      </div>

      {/* New Users Table Section */}
      <div className="w-full">
        <NewUsersTable title="New Users" users={recentUsers} />
      </div>
    </div>
  );
};

export default DashboardPage;

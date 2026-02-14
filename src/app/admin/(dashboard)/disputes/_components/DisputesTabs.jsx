"use client";

import React, { useState } from "react";
import { DisputesTable } from "@/components/dashboard/DisputesTable";

export function DisputesTabs({ disputesData }) {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingDisputes = disputesData.filter(
    (d) => (d.status || "").toLowerCase() !== "resolved"
  );
  const resolvedDisputes = disputesData.filter(
    (d) => (d.status || "").toLowerCase() === "resolved"
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-2 border-b border-[#404040]">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === "pending"
              ? "border-[#582BB3] text-white"
              : "border-transparent text-[#717171] hover:text-[#D9D9D9]"
          }`}
        >
          Pending ({pendingDisputes.length})
        </button>
        <button
          onClick={() => setActiveTab("resolved")}
          className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === "resolved"
              ? "border-[#582BB3] text-white"
              : "border-transparent text-[#717171] hover:text-[#D9D9D9]"
          }`}
        >
          Resolved ({resolvedDisputes.length})
        </button>
      </div>

      {activeTab === "pending" && (
        <DisputesTable
          title="Pending Disputes"
          data={pendingDisputes}
        />
      )}
      {activeTab === "resolved" && (
        <DisputesTable
          title="Resolved Disputes"
          data={resolvedDisputes}
        />
      )}
    </div>
  );
}

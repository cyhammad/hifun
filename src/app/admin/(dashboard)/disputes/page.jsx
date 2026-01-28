"use client";

import React from "react";
import { DisputesTable } from "@/components/dashboard/DisputesTable";

const DisputesPage = () => {
  return (
    <div className="flex flex-col gap-6 py-[32px] px-[24px] min-h-full">
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold text-white"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          Disputes
        </h1>
      </div>

      <div className="w-full flex justify-start">
        <DisputesTable />
      </div>
    </div>
  );
};

export default DisputesPage;

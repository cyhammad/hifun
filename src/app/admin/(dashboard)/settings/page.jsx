"use client";

import React from "react";
import { ProfileCard } from "./_components/ProfileCard";
import { PersonalDetailsCard } from "./_components/PersonalDetailsCard";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-8 py-[32px] px-[24px] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold text-white"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          Settings
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-row gap-8 flex-wrap">
        {/* Profile Card */}
        <ProfileCard />

        {/* Personal Details Section */}
        <PersonalDetailsCard />
      </div>
    </div>
  );
};

export default SettingsPage;

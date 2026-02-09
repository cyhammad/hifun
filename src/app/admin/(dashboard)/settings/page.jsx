import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ProfileCard } from "./_components/ProfileCard";
import { PersonalDetailsCard } from "./_components/PersonalDetailsCard";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  return (
    <div className="flex flex-col gap-8 py-[32px] px-[24px] min-h-full">
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold text-white"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          Settings
        </h1>
      </div>

      <div className="flex flex-row gap-8 flex-wrap">
        <ProfileCard user={user} />
        <PersonalDetailsCard user={user} />
      </div>
    </div>
  );
}

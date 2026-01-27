"use client";

import React from "react";
import Image from "next/image";

const topUsers = [
  {
    rank: 2,
    username: "@craig_love",
    challenges: 23,
    avatar: "/user1.png",
  },
  {
    rank: 1,
    username: "@craig_love",
    challenges: 44,
    avatar: "/user2.png",
    active: true,
  },
  {
    rank: 3,
    username: "@craig_love",
    challenges: 14,
    avatar: "/user3.png",
  },
];

export function TopUsersCard() {
  return (
    <div className="bg-[#080707] w-full h-[330px] rounded-[16px] p-[24px] border border-[#404040] shadow-2xl flex flex-col gap-[24px]">
      <h3
        className="text-[#8C8C8C] text-[16px] font-normal text-center"
        style={{ fontFamily: "var(--font-nunito-sans)" }}
      >
        Last Week Top 03 Users
      </h3>

      <div className="flex flex-1 items-end justify-between px-2 gap-2">
        {/* Rank 2 */}
        <div className="flex flex-col items-center gap-2 flex-1 relative h-[180px] justify-end">
          <div className="w-14 h-14 rounded-full border-[3px] border-[#582BB3] overflow-hidden relative mb-2">
            <Image
              src={topUsers[0].avatar}
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-[#080707] border border-[#404040] rounded-t-[12px] w-full h-[100px] flex flex-col items-center p-3 gap-1">
            <span className="text-white text-[12px] font-bold">
              {topUsers[0].username}
            </span>
            <div className="text-center flex flex-col">
              <span className="text-[#FFBD1D] text-[10px] font-bold">
                {topUsers[0].challenges} Challenges
              </span>
              <span className="text-[#FFBD1D] text-[10px] font-bold">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="flex flex-col items-center gap-2 flex-1 relative h-[240px] justify-end">
          {/* Crown */}
          <div className="absolute top-0 w-8 h-8 z-10">
            <svg
              viewBox="0 0 24 24"
              fill="#FFBD1D"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </div>

          <div className="w-20 h-20 rounded-full border-[4px] border-[#FFBD1D] overflow-hidden relative mb-2 z-10 shadow-[0_0_20px_rgba(255,189,29,0.3)]">
            <Image
              src={topUsers[1].avatar}
              alt="User"
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-gradient-to-b from-[#1A1A1A] to-[#080707] border-x border-t border-[#FFBD1D]/30 rounded-t-[16px] w-full h-[150px] flex flex-col items-center p-4 gap-2 shadow-2xl">
            <span className="text-white text-[14px] font-bold mt-4">
              {topUsers[1].username}
            </span>
            <div className="text-center flex flex-col">
              <span className="text-[#FFBD1D] text-[12px] font-bold">
                {topUsers[1].challenges} Challenges
              </span>
              <span className="text-[#FFBD1D] text-[12px] font-bold">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center gap-2 flex-1 relative h-[160px] justify-end">
          <div className="w-12 h-12 rounded-full border-[2px] border-[#404040] overflow-hidden relative mb-2">
            <Image
              src={topUsers[2].avatar}
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-[#080707] border border-[#404040] rounded-t-[12px] w-full h-[80px] flex flex-col items-center p-2 gap-1 opacity-80">
            <span className="text-white text-[11px] font-bold">
              {topUsers[2].username}
            </span>
            <div className="text-center flex flex-col">
              <span className="text-[#FFBD1D] text-[9px] font-bold">
                {topUsers[2].challenges} Challenges
              </span>
              <span className="text-[#FFBD1D] text-[9px] font-bold">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

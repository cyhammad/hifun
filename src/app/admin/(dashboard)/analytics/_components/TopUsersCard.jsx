"use client";

import React from "react";
import Image from "next/image";

const topUsers = [
  {
    rank: 2,
    username: "Haider",
    challenges: 7,
    avatar: "",
  },
  {
    rank: 1,
    username: "Faiq Asif",
    challenges: 10,
    avatar: "",
    active: true,
  },
  {
    rank: 3,
    username: "Asad",
    challenges: 5,
    avatar: "",
  },
];

export function TopUsersCard() {
  return (
    <div className="w-full h-[350px] rounded-[16px] pt-4 border border-[#404040] flex flex-col font-sans">
      <h3 className="text-white text-[18px] font-normal text-center">
        Last Week Top 03 Users
      </h3>

      <div className="grid grid-cols-[49fr_77fr_47fr] flex-1 items-end">
        {/* Rank 2 */}
        <div className="flex flex-col items-center justify-end pb-6 gap-3 flex-1 relative h-[200px]"
          style={{ background: "linear-gradient(180deg, #080707 0%, rgba(179, 125, 43, 0.1) 100%)" }}
        >
          <div className="w-[70px] h-[70px] rounded-full border-[3px] border-[#582BB3] overflow-hidden relative shadow-[0_0_15px_rgba(88,43,179,0.3)] z-10 bg-black">
            {topUsers[0].avatar ? (
              <Image
                src={topUsers[0].avatar}
                alt="User"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary">
                <span className="text-white text-[24px] font-bold select-none">
                  {topUsers[0].username.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-1 mb-2">
            <span className="text-white text-[14px]">
              {topUsers[0].username}
            </span>
            <div className="text-center flex flex-col text-[#FFBD1D] text-[12px] leading-snug">
              <span className="font-bold">
                {topUsers[0].challenges} Challenges
              </span>
              <span className="font-bold">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Rank 1 */}
        <div
          className="flex flex-col items-center justify-end pb-6 gap-3 flex-1 relative h-[260px]"
          style={{
            background: "linear-gradient(180deg, #080707 0%, rgba(179, 125, 43, 0.1) 100%)"
          }}
        >
          {/* Crown & Avatar Wrapper */}
          <div className="relative mt-auto">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[42px] h-[42px] z-20">
              <Image src="/crown.png" alt="Crown" fill className="object-contain" />
            </div>

            <div className="w-[86px] h-[86px] rounded-full border-4 border-[#FFBD1D] overflow-hidden relative shadow-[0_0_20px_rgba(255,189,29,0.4)] z-10 bg-black">
              {topUsers[1].avatar ? (
                <Image
                  src={topUsers[1].avatar}
                  alt="User"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary">
                  <span className="text-white text-[24px] font-bold select-none">
                    {topUsers[1].username.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 mb-2">
            <span className="text-white text-[16px]">
              {topUsers[1].username}
            </span>
            <div className="text-center flex flex-col leading-snug">
              <span className="text-[#FFBD1D] text-[13px]">
                {topUsers[1].challenges} Challenges
              </span>
              <span className="text-[#FFBD1D] text-[13px]">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center justify-end pb-6 gap-3 flex-1 relative h-[160px]"
          style={{ background: "linear-gradient(180deg, #080707 0%, rgba(179, 125, 43, 0.1) 100%)" }}
        >
          <div className="w-[50px] h-[50px] rounded-full border-[2px] border-[#404040] overflow-hidden relative shadow-[0_0_10px_rgba(64,64,64,0.2)] z-10 bg-black opacity-90">
            {topUsers[2].avatar ? (
              <Image
              src={topUsers[2].avatar}
              alt="User"
              fill
              className="object-cover"
            />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary">
                <span className="text-white text-[24px] font-bold select-none">
                  {topUsers[2].username.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-1 mb-2">
            <span className="text-white text-[13px]">
              {topUsers[2].username}
            </span>
            <div className="text-center flex flex-col leading-snug">
              <span className="text-[#FFBD1D] text-[11px]">
                {topUsers[2].challenges} Challenges
              </span>
              <span className="text-[#FFBD1D] text-[11px]">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

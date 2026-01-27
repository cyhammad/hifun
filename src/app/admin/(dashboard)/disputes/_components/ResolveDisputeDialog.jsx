"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ResolveDisputeDialog({ trigger }) {
  const [selected, setSelected] = useState(0);

  const parties = [
    { name: "Stephanie Sharkey", avatar: "/user1.png" },
    { name: "Stephanie Sharkey", avatar: "/user2.png" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[418px] max-w-[418px] h-[311px] bg-[#191919] border-none rounded-[20px] p-[20px] gap-[10px] text-white overflow-hidden shadow-2xl flex flex-col"
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
      >
        <DialogHeader className="p-0 space-y-1">
          <DialogTitle className="text-[24px] font-medium text-white">
            Resolve Dispute
          </DialogTitle>
          <p className="text-[16px] text-[#717171] font-normal leading-tight">
            Select to give decision in favor of a person.
          </p>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-2 mt-2">
          {parties.map((party, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className={`flex h-[52px] items-center justify-between p-2 rounded-[12px] cursor-pointer transition-all border ${
                selected === index
                  ? "bg-[#241E33] border-[#404040]"
                  : "bg-transparent border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden shrink-0 relative">
                  <Image
                    src={party.avatar}
                    alt={party.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-[14px] font-medium tracking-wide text-[#E9E9E9]"
                  style={{ fontFamily: "var(--font-nunito-sans)" }}
                >
                  {party.name}
                </span>
              </div>

              {selected === index && (
                <div className="w-6 h-6 bg-[#FFBD1D] rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#191919"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="w-full h-[50px] bg-[#582BB3] hover:bg-[#7245f0] text-white font-light text-[15px] rounded-[8px] transition-all active:scale-[0.98] mt-auto"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          Done
        </button>
      </DialogContent>
    </Dialog>
  );
}

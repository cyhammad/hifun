"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import { ResolveDisputeDialog } from "./ResolveDisputeDialog";

export function DisputeDetailsDialog({ trigger, user }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[418px] max-w-[418px] bg-[#191919] border-none rounded-[20px] p-[20px] gap-[6px] text-white overflow-hidden shadow-2xl"
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
      >
        <DialogHeader className="mb-2">
          <DialogTitle className="text-[24px] font-medium text-white">
            Dispute Details
          </DialogTitle>
        </DialogHeader>

        {/* Proof Section */}
        <div className="space-y-2">
          <h4 className="text-[#717171] text-[16px] font-normal">Proof</h4>
          <div className="relative w-full h-[180px] rounded-[16px] overflow-hidden bg-black border border-[#404040]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-12 h-12 bg-[#582BB3] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#7245f0] transition-colors">
                <Play className="w-5 h-5 text-white fill-white ml-1" />
              </div>
            </div>
            <Image
              src="/proof.png"
              alt="Proof Video"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-[10px] text-white z-20 font-medium tracking-tight">
              07:45
            </div>
          </div>
        </div>

        {/* Reason Section */}
        <div className="space-y-2 mt-2">
          <h4 className="text-[#717171] text-[16px] font-normal">Reason</h4>
          <div className="w-full h-fit border border-[#404040] rounded-[16px] p-4 text-sm text-white tracking-wider font-light">
            I completed the challenge within given time and completely followed
            it but it still got rejected why.
          </div>
        </div>

        {/* Chats Section */}
        <div className="space-y-2 mt-2 flex flex-col">
          <h4 className="text-[#717171] text-[16px] font-normal px-1">Chats</h4>

          <div className="w-full gap-1 flex flex-col relative">
            {/* Chat Item 1 */}
            <div className="bg-[#241E33] border-y border-[#404040] p-3 flex items-center gap-3 transition-colors">
              <div className="w-14 h-14 rounded-full border border-white/20 overflow-hidden shrink-0 relative">
                <Image
                  src="/user1.png"
                  alt="Stephanie"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span
                    className="text-[14px] font-medium tracking-wide text-[#E9E9E9]"
                    style={{ fontFamily: "var(--font-nunito-sans)" }}
                  >
                    Stephanie Sharkey
                  </span>
                  <span
                    className="text-[10px] text-[#E9E9E9] font-light"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    10:43 am
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className="text-[12px] text-white/70 line-clamp-1 tracking-wide font-normal"
                    style={{ fontFamily: "var(--font-nunito-sans)" }}
                  >
                    Aliquam a dui vel justo fringilla euismod id...
                  </p>
                  <div
                    className="bg-[#FFBD1D] text-black text-[12px] font-medium w-[29px] h-[26px] rounded-[24px] flex items-center justify-center"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    9+
                  </div>
                </div>
              </div>
            </div>
            {/* Chat Item 2 */}
            <div className="p-3 flex items-center gap-3 bg-transparent border-t border-[#404040] transition-colors">
              <div className="w-14 h-14 rounded-full border border-white/20 overflow-hidden shrink-0 relative">
                <Image
                  src="/user2.png"
                  alt="Mary"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span
                    className="text-[14px] font-medium tracking-wide text-[#E9E9E9]"
                    style={{ fontFamily: "var(--font-nunito-sans)" }}
                  >
                    Mary Freund
                  </span>
                  <span
                    className="text-[10px] text-[#E9E9E9] font-light"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    12:59 am
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className="text-[12px] text-[#717171] line-clamp-1 tracking-wide font-normal"
                    style={{ fontFamily: "var(--font-nunito-sans)" }}
                  >
                    Pellentesque suscipit fringilla libero eu ulla...
                  </p>
                  <div className="ml-2 mt-auto">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.14595 8.48513C5.90686 8.24604 5.51921 8.24604 5.28011 8.48513C5.04101 8.72423 5.04101 9.11188 5.28011 9.35098L5.71303 8.91806L6.14595 8.48513ZM8.74349 11.9485L8.31057 12.3814C8.42539 12.4963 8.58112 12.5608 8.74351 12.5608C8.90589 12.5608 9.06162 12.4962 9.17644 12.3814L8.74349 11.9485ZM15.2367 6.32047C15.4758 6.08136 15.4758 5.69371 15.2367 5.45463C14.9976 5.21554 14.6099 5.21556 14.3708 5.45467L14.8038 5.88757L15.2367 6.32047ZM2.57452 8.48513C2.33543 8.24604 1.94778 8.24604 1.70868 8.48513C1.46958 8.72423 1.46958 9.11188 1.70868 9.35098L2.1416 8.91806L2.57452 8.48513ZM4.73914 12.3814C4.97823 12.6205 5.36589 12.6205 5.60498 12.3814C5.84408 12.1423 5.84408 11.7547 5.60498 11.5156L5.17206 11.9485L4.73914 12.3814ZM11.6679 6.31852C11.9059 6.07834 11.9041 5.69069 11.6639 5.45269C11.4237 5.21468 11.0361 5.21644 10.7981 5.45662L11.233 5.88757L11.6679 6.31852ZM8.49243 7.78335C8.25443 8.02353 8.25619 8.41118 8.49637 8.64918C8.73655 8.88719 9.1242 8.88543 9.36221 8.64525L8.92732 8.2143L8.49243 7.78335ZM5.71303 8.91806L5.28011 9.35098L8.31057 12.3814L8.74349 11.9485L9.17641 11.5156L6.14595 8.48513L5.71303 8.91806ZM8.74349 11.9485L9.17644 12.3814L15.2367 6.32047L14.8038 5.88757L14.3708 5.45467L8.31054 11.5156L8.74349 11.9485ZM2.1416 8.91806L1.70868 9.35098L4.73914 12.3814L5.17206 11.9485L5.60498 11.5156L2.57452 8.48513L2.1416 8.91806ZM11.233 5.88757L10.7981 5.45662L8.49243 7.78335L8.92732 8.2143L9.36221 8.64525L11.6679 6.31852L11.233 5.88757Z"
                        fill="#FFBD1D"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <ResolveDisputeDialog
          trigger={
            <button
              className="w-full h-[52px] bg-[#582BB3] hover:bg-[#7245f0] text-white font-light text-[15px] rounded-[8px] mt-2 transition-all active:scale-[0.98]"
              style={{ fontFamily: "var(--font-nunito-sans)" }}
            >
              Resolve Dispute
            </button>
          }
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, MessageCircle } from "lucide-react";
import { ResolveDisputeDialog } from "./ResolveDisputeDialog";

export function DisputeDetailsDialog({ trigger, user: dispute }) {
  if (!dispute) return null;

  // Ensure we always have a valid image src
  const proofImageSrc = (() => {
    if (dispute.files && Array.isArray(dispute.files) && dispute.files.length > 0) {
      const firstFile = dispute.files[0];
      if (typeof firstFile === 'string' && firstFile.trim() !== '') {
        return firstFile;
      }
    }
    return "/proof.png";
  })();

  const handleChat = (user) => {
    if (!user.uid) return;
    window.location.href = `/admin/chat?name=${encodeURIComponent(user.name || "User")}&id=${user.uid}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[418px] max-w-[418px] bg-[#191919] border-none rounded-[20px] p-[20px] gap-[6px] text-white overflow-hidden shadow-2xl"
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
      >
        <DialogHeader className="mb-2">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-[24px] font-medium text-white">
              {dispute.title || "Dispute Details"}
            </DialogTitle>
            <span className="text-xs text-[#717171]">ID: {dispute.challengeID || "N/A"}</span>
          </div>
        </DialogHeader>

        {/* Proof Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-[#717171] text-[16px] font-normal">Proof</h4>
            <span className="text-xs px-2 py-0.5 rounded bg-[#582BB3]/20 text-[#be9ffc] border border-[#582BB3]/30 capitalize">
              {dispute.status || "Unknown"}
            </span>
          </div>

          <div className="relative w-full h-[180px] rounded-[16px] overflow-hidden bg-black border border-[#404040]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-12 h-12 bg-[#582BB3] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#7245f0] transition-colors">
                <Play className="w-5 h-5 text-white fill-white ml-1" />
              </div>
            </div>
            <Image
              src={proofImageSrc}
              alt="Proof"
              fill
              className="object-cover opacity-50"
            />
          </div>
        </div>

        {/* Reason Section */}
        <div className="space-y-2 mt-2">
          <h4 className="text-[#717171] text-[16px] font-normal">Reason</h4>
          <div className="w-full h-fit border border-[#404040] rounded-[16px] p-4 text-sm text-white tracking-wider font-light">
            {dispute.description || "No description provided."}
          </div>
        </div>

        {/* Users Involved / Chat Section */}
        <div className="space-y-2 mt-2">
          <h4 className="text-[#717171] text-[16px] font-normal">Users Involved</h4>
          <div className="flex flex-col gap-2">
            {[dispute.submitter, dispute.opponent].filter(Boolean).map((participant, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-[12px] bg-[#222222] border border-[#333333]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-full overflow-hidden relative border border-white/10 bg-[#404040] flex items-center justify-center">
                    {participant.avatar && participant.avatar !== "/user-placeholder.png" ? (
                      <Image
                        src={participant.avatar}
                        alt={participant.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400 font-bold">
                        {idx === 0 ? "SUB" : "OPP"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-[#E9E9E9]">
                      {participant.name}
                    </span>
                    <span className="text-[10px] text-[#717171]">
                      {idx === 0 ? "Submitter" : "Opponent"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleChat(participant)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#717171] hover:text-white"
                >
                  <MessageCircle size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <ResolveDisputeDialog
          trigger={
            <button
              disabled={dispute.status === "Resolved"}
              className="w-full h-[52px] bg-[#582BB3] hover:bg-[#7245f0] disabled:bg-white/10 disabled:text-[#717171] disabled:cursor-not-allowed text-white font-light text-[15px] rounded-[8px] mt-4 transition-all active:scale-[0.98]"
              style={{ fontFamily: "var(--font-nunito-sans)" }}
            >
              {dispute.status === "Resolved" ? "Resolved" : "Resolve Dispute"}
            </button>
          }
          dispute={dispute}
        />
      </DialogContent>
    </Dialog>
  );
}


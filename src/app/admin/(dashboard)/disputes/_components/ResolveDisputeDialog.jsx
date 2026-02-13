"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

export function ResolveDisputeDialog({ trigger, dispute }) {
  const [selected, setSelected] = useState(0); // 0 = Submitter wins, 1 = Opponent wins
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (!dispute) return null;

  // Options for resolution using enriched data
  const options = [
    {
      label: `Favor ${dispute.submitter?.name || "Submitter"}`,
      subLabel: "Accept Dispute",
      image: dispute.submitter?.avatar || "/user-placeholder.png",
      value: "accept",
      participantId: dispute.submitter?.uid,
      participantName: dispute.submitter?.name
    },
    {
      label: `Favor ${dispute.opponent?.name || "Opponent"}`,
      subLabel: "Reject Dispute",
      image: dispute.opponent?.avatar || "/user-placeholder.png",
      value: "reject",
      participantId: dispute.opponent?.uid,
      participantName: dispute.opponent?.name
    }
  ];

  const handleResolve = async () => {
    setLoading(true);
    try {
      const decision = options[selected];

      const payload = {
        disputeId: dispute.id,
        status: "resolved", // Lowercase to match enum
        winnerId: decision.participantId || null,
        inFavourOf: decision.participantName || "Unknown"
      };

      const res = await fetch("/api/admin/disputes/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpen(false);
        router.push("/admin/disputes");
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Failed to resolve dispute:", errorData.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error resolving dispute:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[418px] max-w-[418px] min-h-[311px] bg-[#191919] border-none rounded-[20px] p-[20px] gap-[10px] text-white overflow-hidden shadow-2xl flex flex-col"
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
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className={`flex h-[52px] items-center justify-between p-2 rounded-[12px] cursor-pointer transition-all border ${selected === index
                ? "bg-[#241E33] border-[#404040]"
                : "bg-transparent border-transparent hover:bg-white/5"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden shrink-0 relative flex items-center justify-center bg-gray-800">
                  {option.image && option.image !== "/user-placeholder.png" && option.image !== "/system-avatar.png" ? (
                    <Image
                      src={option.image}
                      alt={option.label}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-bold">
                      {index === 0 ? "SUB" : "OPP"}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span
                    className="text-[14px] font-medium tracking-wide text-[#E9E9E9]"
                    style={{ fontFamily: "var(--font-nunito-sans)" }}
                  >
                    {option.label}
                  </span>
                  <span className="text-[10px] text-gray-500">{option.subLabel}</span>
                </div>
              </div>

              {selected === index && (
                <div className="w-6 h-6 bg-[#FFBD1D] rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#191919] stroke-[3]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleResolve}
          disabled={loading}
          className="w-full h-[50px] bg-[#582BB3] hover:bg-[#7245f0] disabled:opacity-50 text-white font-light text-[15px] rounded-[8px] transition-all active:scale-[0.98] mt-4 flex items-center justify-center"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          {loading ? "Resolving..." : "Done"}
        </button>
      </DialogContent>
    </Dialog>
  );
}


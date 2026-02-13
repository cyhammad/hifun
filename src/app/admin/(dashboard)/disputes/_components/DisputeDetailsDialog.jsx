"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, MessageCircle, X, Loader2, ImageIcon, Video } from "lucide-react";
import { ResolveDisputeDialog } from "./ResolveDisputeDialog";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";



// Media Preview Modal Component
function MediaPreviewModal({ open, onClose, mediaUrl }) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] p-0 bg-black/95 border-white/10 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="hidden">Media Preview</DialogTitle>
          <DialogDescription className="hidden">Full size view of the submitted proof media.</DialogDescription>
        </DialogHeader>
        <div className="relative flex items-center justify-center min-h-[50vh] max-h-[85vh] p-4">
          <video
            src={mediaUrl}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-[80vh] rounded-lg"
            style={{ objectFit: 'contain' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DisputeDetailsDialog({ trigger, user: dispute }) {
  const router = useRouter();
  const [proofData, setProofData] = useState(null);
  const [loadingProof, setLoadingProof] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch proof from submitted_proofs collection when dialog opens
  useEffect(() => {
    if (!dialogOpen || !dispute?.id) return;

    const fetchProof = async () => {
      setLoadingProof(true);
      try {
        let finalProofData = null;

        // 1. Try fetching from submitted_proofs
        let proofDoc = await getDoc(doc(db, "submitted_proofs", dispute.id));
        if (!proofDoc.exists() && dispute.challengeID) {
          proofDoc = await getDoc(doc(db, "submitted_proofs", dispute.challengeID));
        }

        if (proofDoc.exists()) {
          finalProofData = proofDoc.data();
          console.log("Found proof in submitted_proofs:", finalProofData);
        }

        // 2. If we found a postID in proof, or have a challengeID, check the challenges collection
        // This is often where the actual media URL from the user's screenshot is stored
        const targetChallengeId = finalProofData?.postID || dispute.challengeID || dispute.id;
        if (targetChallengeId) {
          const challengeDoc = await getDoc(doc(db, "challenges", targetChallengeId));
          if (challengeDoc.exists()) {
            const challengeData = challengeDoc.data();
            console.log("Found supporting data in challenges:", challengeData);

            // Merge data, prioritizing challenge media if proof media looks like a placeholder
            // or if proof media is missing
            const isPlaceholder = (url) => url?.includes('BigBuckBunny') || url?.includes('sample-video');

            if (!finalProofData || isPlaceholder(finalProofData.mediaURL) || isPlaceholder(finalProofData.mediaUrl)) {
              finalProofData = {
                ...finalProofData,
                ...challengeData,
                // Ensure IDs don't get overwritten incorrectly
                id: finalProofData?.id || challengeDoc.id
              };
            }
          }
        }

        if (finalProofData) {
          setProofData(finalProofData);
        } else {
          console.log("No proof or challenge data found for:", dispute.id);
          setProofData(null);
        }
      } catch (error) {
        console.error("Error fetching proof/challenge data:", error);
        setProofData(null);
      } finally {
        setLoadingProof(false);
      }
    };

    fetchProof();
  }, [dialogOpen, dispute?.id]);

  if (!dispute) return null;

  const mediaUrl = proofData?.mediaUrl || proofData?.mediaURL || proofData?.videoUrl || proofData?.videoURL ||
    dispute?.mediaUrl || dispute?.mediaURL || dispute?.videoUrl || dispute?.videoURL || null;

  const handleChat = (user) => {
    if (!user.uid) return;
    router.push(`/admin/chat?name=${encodeURIComponent(user.name || "User")}&id=${user.uid}&disputeId=${dispute.id}`);
  };

  const handleMediaClick = () => {
    if (mediaUrl) {
      setMediaModalOpen(true);
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              <DialogDescription className="hidden">
                Details and evidence for dispute {dispute.id}
              </DialogDescription>
              <span className="text-xs text-[#717171]">ID: {dispute.challengeID || dispute.id || "N/A"}</span>
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

            <div
              className="relative w-full h-[180px] rounded-[16px] overflow-hidden bg-black border border-[#404040] cursor-pointer group"
              onClick={handleMediaClick}
            >
              {loadingProof ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[#582BB3] animate-spin" />
                </div>
              ) : mediaUrl ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 bg-[#582BB3] rounded-full flex items-center justify-center group-hover:bg-[#7245f0] transition-colors">
                      <Play className="w-5 h-5 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Media type badge */}
                  <div className="absolute top-2 right-2 z-20 px-2 py-1 rounded bg-black/60 text-white text-xs flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Video
                  </div>

                  {/* Thumbnail / Video Preview */}
                  {proofData?.thumbnail ? (
                    <img
                      src={proofData.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-70"
                    />
                  ) : (
                    <video
                      src={`${mediaUrl}#t=0.1`}
                      className="w-full h-full object-cover opacity-70"
                      muted
                      preload="metadata"
                      playsInline
                    />
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#717171]">
                  <Video className="w-10 h-10 mb-2 opacity-50" />
                  <span className="text-sm">No video proof submitted</span>
                </div>
              )}
            </div>

            {mediaUrl && (
              <p className="text-xs text-[#717171] text-center">
                Click to view video in full size
              </p>
            )}
          </div>

          {/* Reason Section */}
          <div className="space-y-2 mt-2">
            <h4 className="text-[#717171] text-[16px] font-normal">Reason</h4>
            <div className="w-full h-fit border border-[#404040] rounded-[16px] p-4 text-sm text-white tracking-wider font-light">
              {dispute.description || proofData?.captions || proofData?.reason || "No description provided."}
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
                disabled={dispute.status === "resolved"}
                className="w-full h-[52px] bg-[#582BB3] hover:bg-[#7245f0] disabled:bg-white/10 disabled:text-[#717171] disabled:cursor-not-allowed text-white font-light text-[15px] rounded-[8px] mt-4 transition-all active:scale-[0.98]"
                style={{ fontFamily: "var(--font-nunito-sans)" }}
              >
                {dispute.status === "resolved" ? "Resolved" : "Resolve Dispute"}
              </button>
            }
            dispute={dispute}
          />
        </DialogContent>
      </Dialog>

      {/* Media Preview Modal */}
      <MediaPreviewModal
        open={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        mediaUrl={mediaUrl}
      />
    </>
  );
}



import React from "react";
import { DisputesTabs } from "./_components/DisputesTabs";
import { adminDb } from "@/lib/firebase-admin";

// Fetch disputes and join with user data
async function getDisputes() {
  try {
    const disputesSnapshot = await adminDb.collection("disputes").get();

    if (disputesSnapshot.empty) {
      return [];
    }

    const disputes = disputesSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    // Get unique user IDs (collect from both submittedBy and challengedUserId/opponentId)
    const userIds = new Set();
    disputes.forEach(d => {
      if (d.submittedBy) userIds.add(d.submittedBy);
      // We assume challengedUserId or opponentId might be fields. 
      // Based on common patterns, let's look for challengedUserId or similar.
      if (d.challengedUserId) userIds.add(d.challengedUserId);
      if (d.opponentId) userIds.add(d.opponentId);
      // Also check if challengedBy exists
      if (d.challengedBy) userIds.add(d.challengedBy);
      if (d.nextUserID) userIds.add(d.nextUserID);
    });

    const userIdsArray = [...userIds].filter(Boolean);

    const userMap = {};
    if (userIdsArray.length > 0) {
      // Chunking if > 10 is needed for 'in' queries
      const chunks = [];
      for (let i = 0; i < userIdsArray.length; i += 10) {
        chunks.push(userIdsArray.slice(i, i + 10));
      }

      for (const chunk of chunks) {
        const usersSnapshot = await adminDb.collection("users").where("uid", "in", chunk).get();
        usersSnapshot.forEach(doc => {
          userMap[doc.data().uid] = doc.data();
        });
      }
    }

    // Combine data
    return disputes.map(dispute => {
      const submitter = userMap[dispute.submittedBy] || {};

      // Try to find opponent ID
      const opponentId = dispute.nextUserID || dispute.challengedUserId || dispute.opponentId || dispute.challengedBy || null;
      const opponent = opponentId ? (userMap[opponentId] || {}) : {};

      return {
        ...dispute,
        status: ["unknown", "pending", "resolved"].includes((dispute.status || "").toLowerCase()) ? dispute.status.toLowerCase() : "unknown",
        name: submitter.name || "Unknown User",
        email: submitter.email || "No Email",
        submittedOn: "Unknown",
        submitter: {
          uid: dispute.submittedBy,
          name: submitter.name || "Unknown User",
          avatar: submitter.imageURL || "/user-placeholder.png",
          email: submitter.email || "No Email"
        },
        opponent: {
          uid: opponentId,
          name: opponent.name || "System / opponent",
          avatar: opponent.imageURL || "/user-placeholder.png",
          email: opponent.email || "No Email"
        }
      };
    });

  } catch (error) {
    console.error("Error fetching disputes:", error);
    return [];
  }
}

const DisputesPage = async () => {
  const disputesData = await getDisputes();

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
        <DisputesTabs disputesData={disputesData} />
      </div>
    </div>
  );
};

export default DisputesPage;

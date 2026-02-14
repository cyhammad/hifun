import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request) {
    try {
        const { disputeId, status, winnerId, inFavourOf } = await request.json();

        if (!disputeId || !status) {
            console.error("Missing required fields for dispute resolution:", { disputeId, status });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const validStatuses = ["unknown", "pending", "resolved"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status type" },
                { status: 400 }
            );
        }

        const updateData = {
            status,
            winnerId: winnerId || null,
            inFavourOf: inFavourOf || null,
            resolvedAt: Date.now(),
        };

        // Update the dispute in Firestore
        await adminDb.collection("disputes").doc(disputeId).update(updateData);

        // When resolved, also mark the related challenge as completed
        if (status === "resolved") {
            const disputeDoc = await adminDb.collection("disputes").doc(disputeId).get();
            const disputeData = disputeDoc.data() || {};

            let challengeId = disputeData.postID;
            if (!challengeId) {
                let proofDoc = await adminDb.collection("submitted_proofs").doc(disputeId).get();
                if (!proofDoc.exists && disputeData.challengeID) {
                    proofDoc = await adminDb.collection("submitted_proofs").doc(disputeData.challengeID).get();
                }
                if (proofDoc.exists) {
                    const proofData = proofDoc.data() || {};
                    challengeId = proofData.postID || disputeData.challengeID || disputeId;
                }
            }

            if (challengeId) {
                try {
                    await adminDb.collection("challenges").doc(challengeId).update({ status: "completed" });
                } catch (err) {
                    console.warn("Could not update challenge status (challenge may not exist):", challengeId, err.message);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error resolving dispute:", error);
        return NextResponse.json(
            { error: error.message || "Failed to resolve dispute" },
            { status: 500 }
        );
    }
}

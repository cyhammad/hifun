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

        const updateData = {
            status,
            winnerId: winnerId || null,
            inFavourOf: inFavourOf || null,
            resolvedAt: Date.now(),
        };

        // Update the dispute in Firestore
        await adminDb.collection("disputes").doc(disputeId).update(updateData);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error resolving dispute:", error);
        return NextResponse.json(
            { error: error.message || "Failed to resolve dispute" },
            { status: 500 }
        );
    }
}

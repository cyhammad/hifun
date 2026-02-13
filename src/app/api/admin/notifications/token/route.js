import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";

// Save or update FCM token for the authenticated admin
export async function POST(request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: "FCM token is required" },
                { status: 400 }
            );
        }

        // Save token in notification_tokens collection using token as doc ID
        // to avoid duplicates for the same device
        await adminDb.collection("notification_tokens").doc(token).set({
            uid: user.uid,
            token: token,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }, { merge: true });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save FCM token:", error);
        return NextResponse.json(
            { error: "Failed to save notification token" },
            { status: 500 }
        );
    }
}

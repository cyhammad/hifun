import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { recipientId, content, type = "text", imageUrl, disputeId } = await request.json();

        if (!recipientId) {
            return NextResponse.json(
                { error: "Recipient ID is required" },
                { status: 400 }
            );
        }

        if (!content && !imageUrl) {
            return NextResponse.json(
                { error: "Message content or image is required" },
                { status: 400 }
            );
        }

        // Build conversation ID
        let conversationId;
        const participants = [user.uid, recipientId].sort();

        if (disputeId) {
            conversationId = disputeId;
        } else {
            conversationId = participants.join("_");
        }

        // Unix seconds timestamp
        const timestamp = Math.floor(Date.now() / 1000);

        // Message data
        const messageData = {
            senderId: user.uid,
            content: content || "",
            type,
            timestamp,
            read: false,
        };

        if (imageUrl) {
            messageData.imageUrl = imageUrl;
        }

        // Save message to conversations/{conversationId}/messages
        const messageRef = await adminDb
            .collection("conversations")
            .doc(conversationId)
            .collection("messages")
            .add(messageData);

        // Update conversation metadata
        await adminDb.collection("conversations").doc(conversationId).set(
            {
                participants,
                lastMessage: content || (imageUrl ? "📷 Image" : ""),
                lastMessageTimestamp: timestamp,
                lastMessageSenderId: user.uid,
                updatedAt: timestamp,
            },
            { merge: true }
        );

        return NextResponse.json({
            success: true,
            messageId: messageRef.id,
        });
    } catch (error) {
        console.error("Failed to send message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}

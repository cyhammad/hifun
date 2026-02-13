import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";
import crypto from "crypto";

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

        // Build conversation ID according to new requirements: postId + recipientId
        let conversationId;
        const postId = disputeId || "legacy";
        conversationId = `${postId}${recipientId}`;

        // Unix seconds timestamp for messages
        const timestamp = Math.floor(Date.now() / 1000);
        // JS timestamp (ms) for sentAt, createdAt, updatedAt as requested
        const jsTimestamp = Date.now();

        // Save message to admin_chats/{conversationId}/messages
        const messageCollection = adminDb
            .collection("admin_chats")
            .doc(conversationId)
            .collection("messages");

        const messageId = crypto.randomUUID();
        const newMessageRef = messageCollection.doc(messageId);

        // Message data according to new format
        const messageData = {
            id: messageId,
            message: content || "",
            senderId: user.uid,
            sentAt: jsTimestamp,
            read: false,
            type: type,
            attachmentURL: imageUrl || null
        };

        await newMessageRef.set(messageData);

        // Update/Set admin_chat document fields
        await adminDb.collection("admin_chats").doc(conversationId).set(
            {
                id: conversationId,
                participants: [recipientId, user.uid],
                lastMessage: content || (imageUrl ? "📷 Attachment" : ""),
                lastMessageTimestamp: jsTimestamp,
                lastMessageSenderId: user.uid,
                createdAt: jsTimestamp,
                updatedAt: jsTimestamp,
            },
            { merge: true }
        );

        return NextResponse.json({
            success: true,
            messageId: newMessageRef.id,
        });
    } catch (error) {
        console.error("Failed to send message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}

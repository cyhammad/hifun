
import { NextResponse } from "next/server";
import { adminDb, adminAuth, adminMessaging } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        // 1. Verify Authentication
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decodedClaims;
        try {
            decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        } catch (error) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        const adminId = decodedClaims.uid;

        // 2. Parse Request
        const { recipientId, content, type = "text" } = await request.json();

        if (!recipientId || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 3. Create/Get Conversation Document
        // Create a consistent ID for the conversation (e.g., sort the UIDs)
        const participants = [adminId, recipientId].sort();
        const conversationId = participants.join("_");

        const conversationRef = adminDb.collection("conversations").doc(conversationId);
        const messagesRef = conversationRef.collection("messages");

        const newMessage = {
            content,
            senderId: adminId,
            recipientId,
            timestamp: new Date(),
            read: false,
            type
        };

        // Add message to subcollection
        const msgDoc = await messagesRef.add(newMessage);

        // Update last message on main conversation doc
        await conversationRef.set({
            lastMessage: content,
            lastMessageTimestamp: new Date(),
            participants: [adminId, recipientId],
            updatedAt: new Date(),
            // Store specific participant details if needed, or rely on fetching users separately
            participantIds: participants
        }, { merge: true });

        // --- Send Push Notification ---
        try {
            const tokenDoc = await adminDb.collection("notifications_tokens").doc(recipientId).get();

            if (tokenDoc.exists) {
                const tokenData = tokenDoc.data();
                const fcmToken = tokenData.fcmToken || tokenData.token;

                if (fcmToken) {
                    const senderName = decodedClaims.name || decodedClaims.email || "Admin"; // Fallback name

                    await adminMessaging.send({
                        token: fcmToken,
                        notification: {
                            title: `Message from ${senderName}`,
                            body: content.length > 100 ? content.substring(0, 97) + "..." : content,
                        },
                        data: {
                            type: "chat_message",
                            conversationId: conversationId,
                            senderId: adminId,
                            click_action: "FLUTTER_NOTIFICATION_CLICK" // Common for Flutter apps, or custom
                        }
                    });
                } else {
                    console.warn(`No FCM token found for user ${recipientId}`);
                }
            }
        } catch (filesNotificationError) {
            console.error("Error sending push notification:", filesNotificationError);
            // Don't fail the request if notification fails, the message was sent successfully
        }

        return NextResponse.json({ success: true, id: msgDoc.id, conversationId });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

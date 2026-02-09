import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
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
        const { photoURL, displayName, email } = await request.json();

        // 3. Update user profile in Firebase Auth
        const updateData = {};

        if (photoURL !== undefined) {
            updateData.photoURL = photoURL;
        }

        if (displayName !== undefined) {
            updateData.displayName = displayName;
        }

        if (email !== undefined) {
            updateData.email = email;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        await adminAuth.updateUser(adminId, updateData);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

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

        const email = decodedClaims.email;
        const uid = decodedClaims.uid;

        if (!email) {
            return NextResponse.json({ error: "Email not found in session" }, { status: 400 });
        }

        // 2. Parse Request
        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
        }

        // 3. Verify current password by attempting to sign in
        try {
            await signInWithEmailAndPassword(auth, email, currentPassword);
        } catch (signInError) {
            console.error("Password verification failed:", signInError.code);
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        // 4. Update password using Firebase Admin SDK
        try {
            await adminAuth.updateUser(uid, {
                password: newPassword
            });
        } catch (updateError) {
            console.error("Failed to update password:", updateError);
            return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

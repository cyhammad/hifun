import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

// Session cookie expiration (5 days)
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 5 * 1000;

// Create session cookie from Firebase ID token
export async function POST(request) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json(
                { error: "ID token is required" },
                { status: 400 }
            );
        }

        // Verify the ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        // Create session cookie
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn: SESSION_COOKIE_MAX_AGE,
        });

        // Set the session cookie
        const cookieStore = await cookies();
        cookieStore.set("session", sessionCookie, {
            maxAge: SESSION_COOKIE_MAX_AGE / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return NextResponse.json({
            success: true,
            user: {
                uid: decodedToken.uid,
                email: decodedToken.email,
            }
        });
    } catch (error) {
        console.error("Session creation error:", error);
        return NextResponse.json(
            { error: "Failed to create session" },
            { status: 401 }
        );
    }
}

// Delete session cookie (logout)
export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("session");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Session deletion error:", error);
        return NextResponse.json(
            { error: "Failed to delete session" },
            { status: 500 }
        );
    }
}

// Get current session user (full profile for Settings)
export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json({ user: null });
        }

        let decodedClaims;
        try {
            decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        } catch (verifyError) {
            // Wrong project (aud), expired, or invalid — clear cookie
            cookieStore.delete("session");
            return NextResponse.json({ user: null });
        }

        const uid = decodedClaims.uid;

        let displayName = decodedClaims.name ?? null;
        let creationTime = null;

        try {
            const userRecord = await adminAuth.getUser(uid);
            displayName = userRecord.displayName ?? displayName ?? null;
            creationTime = userRecord.metadata?.creationTime ?? null;
        } catch {
            // use claims only if getUser fails
        }

        return NextResponse.json({
            user: {
                uid,
                email: decodedClaims.email ?? null,
                emailVerified: decodedClaims.email_verified ?? false,
                displayName,
                creationTime,
            },
        });
    } catch (error) {
        console.error("Session verification error:", error);
        return NextResponse.json({ user: null });
    }
}

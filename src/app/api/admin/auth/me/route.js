
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

        return NextResponse.json({
            uid: decodedClaims.uid,
            email: decodedClaims.email,
            name: decodedClaims.name || "Admin",
            photoURL: decodedClaims.picture || null
        });

    } catch (error) {
        return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }
}

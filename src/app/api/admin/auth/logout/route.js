import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();

        // Clear the session cookie by setting it with an expired date
        cookieStore.set("session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0, // Expire immediately
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error logging out:", error);
        return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
    }
}

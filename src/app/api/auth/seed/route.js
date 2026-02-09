import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@hifun.com";
const ADMIN_PASSWORD = "password";
const ADMIN_DISPLAY_NAME = "Admin";

/**
 * POST /api/auth/seed - Create or update the admin user.
 * Allowed in development, or when Authorization: Bearer <FIREBASE_SEED_SECRET> is sent.
 */
export async function POST(request) {
    const isDev = process.env.NODE_ENV === "development";
    const authHeader = request.headers.get("authorization");
    const secret = process.env.FIREBASE_SEED_SECRET;
    const validSecret = secret && authHeader === `Bearer ${secret}`;

    if (!isDev && !validSecret) {
        return NextResponse.json(
            { error: "Not allowed" },
            { status: 403 }
        );
    }

    try {
        let uid;

        try {
            const existing = await adminAuth.getUserByEmail(ADMIN_EMAIL);
            uid = existing.uid;
            await adminAuth.updateUser(uid, {
                password: ADMIN_PASSWORD,
                displayName: ADMIN_DISPLAY_NAME,
            });
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                const newUser = await adminAuth.createUser({
                    email: ADMIN_EMAIL,
                    password: ADMIN_PASSWORD,
                    displayName: ADMIN_DISPLAY_NAME,
                    emailVerified: true,
                });
                uid = newUser.uid;
            } else {
                throw err;
            }
        }

        return NextResponse.json({
            success: true,
            message: "Admin user ready",
            email: ADMIN_EMAIL,
            uid,
        });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to seed admin user" },
            { status: 500 }
        );
    }
}

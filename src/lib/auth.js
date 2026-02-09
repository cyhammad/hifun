import { cookies } from "next/headers";
import { adminAuth } from "./firebase-admin";

/**
 * Get the current authenticated user from session cookie (server-side)
 * Fetches full user record for displayName and creationTime (for Settings)
 * Use this in Server Components and API routes
 */
export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return null;
        }

        let decodedClaims;
        try {
            decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        } catch (verifyError) {
            // Session expired, revoked, or invalid - this is normal lifecycle, not an error
            // Return null to trigger redirect to sign-in page
            return null;
        }

        const uid = decodedClaims.uid;

        let displayName = decodedClaims.name ?? null;
        let creationTime = null;
        let photoURL = decodedClaims.picture ?? null;

        try {
            const userRecord = await adminAuth.getUser(uid);
            displayName = userRecord.displayName ?? displayName ?? null;
            creationTime = userRecord.metadata?.creationTime ?? null;
            photoURL = userRecord.photoURL ?? photoURL ?? null;
        } catch {
            // use claims only if getUser fails
        }

        return {
            uid,
            email: decodedClaims.email ?? null,
            emailVerified: decodedClaims.email_verified ?? false,
            displayName,
            creationTime,
            photoURL,
        };
    } catch (error) {
        console.error("Auth error:", error);
        return null;
    }
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return user !== null;
}

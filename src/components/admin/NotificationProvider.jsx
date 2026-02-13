"use client";

import { useEffect, useRef } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebase";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

/**
 * NotificationProvider - Requests notification permission and registers FCM token.
 * Should be placed in admin layout so it runs on all /admin routes.
 */
export default function NotificationProvider() {
    const tokenSaved = useRef(false);

    useEffect(() => {
        if (tokenSaved.current) return;

        async function setupNotifications() {
            // Guard: only run in browser with notification support
            if (typeof window === "undefined" || !("Notification" in window)) {
                return;
            }

            if (!messaging) {
                console.warn("Firebase Messaging is not initialized");
                return;
            }

            if (!VAPID_KEY) {
                console.warn(
                    "NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set. " +
                    "Get it from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates."
                );
                return;
            }

            try {
                // Request notification permission from the user
                const permission = await Notification.requestPermission();

                if (permission !== "granted") {
                    console.log("Notification permission denied by user");
                    return;
                }

                // Register service worker and wait for it to be active
                const registration = await navigator.serviceWorker.register(
                    "/firebase-messaging-sw.js"
                );

                // Wait until the service worker is active
                if (registration.installing) {
                    await new Promise((resolve) => {
                        registration.installing.addEventListener("statechange", (e) => {
                            if (e.target.state === "activated") resolve();
                        });
                    });
                } else if (registration.waiting) {
                    await new Promise((resolve) => {
                        registration.waiting.addEventListener("statechange", (e) => {
                            if (e.target.state === "activated") resolve();
                        });
                    });
                }
                // If registration.active already exists, no need to wait

                // Get FCM token
                const currentToken = await getToken(messaging, {
                    vapidKey: VAPID_KEY,
                    serviceWorkerRegistration: registration,
                });

                if (currentToken) {
                    // Save the token to the server
                    await fetch("/api/admin/notifications/token", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token: currentToken }),
                    });

                    tokenSaved.current = true;
                    console.log("FCM token registered successfully");
                } else {
                    console.warn("No FCM token received");
                }
            } catch (error) {
                console.error("Error setting up notifications:", error);
            }
        }

        setupNotifications();
    }, []);

    // Listen for foreground messages
    useEffect(() => {
        if (!messaging) return;

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Foreground message received:", payload);

            // Show a browser notification for foreground messages
            if (Notification.permission === "granted") {
                new Notification(payload.notification?.title || "New Notification", {
                    body: payload.notification?.body || "",
                    icon: "/logo.png",
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return null; // This component doesn't render anything
}

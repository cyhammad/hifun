/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyB7TqknHimZRgRDgYMQnqHQQlRlmW1MyjI",
    authDomain: "hifun-854ec.firebaseapp.com",
    projectId: "hifun-854ec",
    storageBucket: "hifun-854ec.firebasestorage.app",
    messagingSenderId: "1002420407850",
    appId: "1:1002420407850:web:84ca5dac4d0aa5539abd53",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message:", payload);

    const notificationTitle = payload.notification?.title || "New Notification";
    const notificationOptions = {
        body: payload.notification?.body || "",
        icon: "/logo.png",
        badge: "/logo.png",
        data: payload.data,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

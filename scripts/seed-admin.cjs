/**
 * One-time script to create/update the admin user in Firebase Auth.
 * Run from project root: node scripts/seed-admin.cjs
 * Loads .env.local if dotenv is installed, or set env vars manually.
 */
const path = require("path");
const fs = require("fs");

// Load .env.local or .env into process.env
function loadEnv(file) {
  const envPath = path.join(__dirname, "..", file);
  if (!fs.existsSync(envPath)) return false;
  const content = fs.readFileSync(envPath, "utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  content.split("\n").forEach((line) => {
    const eq = line.indexOf("=");
    if (eq <= 0 || line.trimStart().startsWith("#")) return;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
      value = value.slice(1, -1).replace(/\\n/g, "\n");
    if (key && !process.env[key]) process.env[key] = value;
  });
  return true;
}
loadEnv(".env.local") || loadEnv(".env");

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const ADMIN_EMAIL = "admin@hifun.com";
const ADMIN_PASSWORD = "password";
const ADMIN_DISPLAY_NAME = "Admin";

async function seed() {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    console.error(
      "Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in .env.local"
    );
    process.exit(1);
  }

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

  const adminAuth = getAuth();

  try {
    const existing = await adminAuth.getUserByEmail(ADMIN_EMAIL);
    await adminAuth.updateUser(existing.uid, {
      password: ADMIN_PASSWORD,
      displayName: ADMIN_DISPLAY_NAME,
    });
    console.log("Admin user updated:", ADMIN_EMAIL);
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      const user = await adminAuth.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        displayName: ADMIN_DISPLAY_NAME,
        emailVerified: true,
      });
      console.log("Admin user created:", ADMIN_EMAIL, "(uid:", user.uid + ")");
    } else {
      console.error("Seed error:", err.message);
      process.exit(1);
    }
  }
  process.exit(0);
}

seed();

import { adminDb } from "@/lib/firebase-admin";
import { NewUsersTable } from "@/components/dashboard/NewUsersTable";

// Helper to format timestamp to readable date
function formatDate(timestamp) {
  if (!timestamp) return "Unknown";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Fetch users from Firestore (server-side)
async function getUsers() {
  try {
    const usersSnapshot = await adminDb
      .collection("users")
      .orderBy("createdAt", "desc")
      .get();

    const users = usersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Unknown",
        email: data.email || "No email",
        joinedDate: formatDate(data.createdAt),
        // Include additional fields if needed
        age: data.age,
        bio: data.bio,
        imageURL: data.imageURL,
        uid: data.uid,
        username: data.username,
      };
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="flex flex-col gap-6 py-[32px] px-[24px] min-h-full">
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold text-white"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          Users
        </h1>
      </div>

      <div className="w-full flex justify-center">
        <NewUsersTable title="All Users" users={users} />
      </div>
    </div>
  );
}

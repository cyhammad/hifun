"use client";

import React from "react";
import { NewUsersTable } from "@/components/dashboard/NewUsersTable";

// We can extend this list to look like "All Users"
const allUsers = [
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "26 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "27 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    joinedDate: "28 September 2024",
  },
];

const UsersPage = () => {
  return (
    <div className="flex flex-col gap-6 py-[32px] px-[24px] min-h-full">
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold text-white"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          Users
        </h1>
      </div>

      <div className="w-full flex justify-center">
        <NewUsersTable title="All Users" users={allUsers} />
      </div>
    </div>
  );
};

export default UsersPage;

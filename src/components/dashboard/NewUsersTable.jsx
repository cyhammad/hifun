"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const defaultUsers = [
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
];

export function NewUsersTable({ title = "New Users", users = defaultUsers }) {
  return (
    <div className="w-full h-fit flex flex-col gap-[24px] rounded-[16px] p-[24px] border border-[#404040]">
      <div className="flex items-center justify-between">
        <h3
          className="text-[24px] font-semibold text-white"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          {title}
        </h3>
        {/* We can make this button conditional or stick to the design. Providing a prop to hide it might be useful later. */}
        <button className="bg-[#582BB3] text-white px-6 py-2.5 rounded-[8px] text-sm font-medium hover:opacity-90 transition-opacity">
          View All
        </button>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#404040] flex-1">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="bg-[#404040] hover:bg-[#404040]">
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto rounded-tl-[12px]">
                Name
              </TableHead>
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto">
                Email
              </TableHead>
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto">
                Joined Date
              </TableHead>
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto rounded-tr-[12px] text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#191919]">
            {users.map((user, index) => (
              <TableRow
                key={index}
                className="group border-b border-[#404040] last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <TableCell className="py-6 px-8 text-sm font-normal text-white border-none">
                  {user.name}
                </TableCell>
                <TableCell className="py-6 px-8 text-sm text-[#D9D9D9] border-none">
                  {user.email}
                </TableCell>
                <TableCell className="py-6 px-8 text-sm text-[#D9D9D9] border-none">
                  {user.joinedDate}
                </TableCell>
                <TableCell className="py-6 px-8 text-right border-none">
                  <button className="bg-[#582BB3] text-white px-8 py-2.5 rounded-[8px] text-sm font-medium hover:bg-[#7245f0] transition-colors">
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

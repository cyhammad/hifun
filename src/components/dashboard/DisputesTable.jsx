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
import { DisputeDetailsDialog } from "@/app/admin/(dashboard)/disputes/_components/DisputeDetailsDialog";

const disputes = [
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    submittedOn: "26 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    submittedOn: "27 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    submittedOn: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    submittedOn: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    submittedOn: "28 September 2024",
  },
  {
    name: "Martin Lu",
    email: "Lu.martin@mail.com",
    submittedOn: "28 September 2024",
  },
];

export function DisputesTable({ title = "All Disputes", data = disputes }) {
  return (
    <div className="w-full h-fit flex flex-col gap-[24px] rounded-[16px] p-[24px] border border-[#404040]">
      <div className="flex items-center justify-between">
        <h3
          className="text-[24px] font-semibold text-white"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          {title}
        </h3>
        {/* 'View All' button is not explicitly shown in the screenshot for disputes, but usually consistent. 
            However, screenshot shows just the table in a white container (which we removed). 
            We'll keep the button for consistency or remove if requested. */}
        {/* <button className="bg-[#582BB3] text-white px-6 py-2.5 rounded-[8px] text-sm font-medium hover:opacity-90 transition-opacity">
          View All
        </button> */}
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#404040] flex-1">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="bg-[#404040] hover:bg-[#404040]">
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto rounded-tl-[12px]">
                Submitted By
              </TableHead>
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto">
                Email
              </TableHead>
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto">
                Submitted On
              </TableHead>
              <TableHead className="py-4 px-8 text-sm font-normal text-white h-auto rounded-tr-[12px] text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#191919]">
            {data.map((item, index) => (
              <TableRow
                key={index}
                className="group border-b border-[#404040] last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <TableCell className="py-6 px-8 text-sm font-normal text-white border-none">
                  {item.name}
                </TableCell>
                <TableCell className="py-6 px-8 text-sm text-[#D9D9D9] border-none">
                  {item.email}
                </TableCell>
                <TableCell className="py-6 px-8 text-sm text-[#D9D9D9] border-none">
                  {item.submittedOn}
                </TableCell>
                <TableCell className="py-6 px-8 text-right border-none">
                  <DisputeDetailsDialog
                    trigger={
                      <button className="bg-[#582BB3] text-white px-8 py-2.5 rounded-[8px] text-sm font-medium hover:bg-[#7245f0] transition-colors">
                        View
                      </button>
                    }
                    user={item}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

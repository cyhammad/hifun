"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DisputeDetailsDialog } from "@/app/admin/(dashboard)/disputes/_components/DisputeDetailsDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultDisputes = [
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

export function DisputesTable({ title = "All Disputes", data = defaultDisputes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDisputes = data.slice(startIndex, endIndex);

  const formatDate = (value) => {
    if (value == null) return "—";
    // Unix timestamp (seconds or milliseconds)
    const num = Number(value);
    if (!Number.isFinite(num)) return String(value);
    const ms = num < 1e12 ? num * 1000 : num;
    return new Date(ms).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full h-fit flex flex-col gap-[24px] rounded-[16px] p-[24px] border border-[#404040] font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-semibold text-white">{title}</h3>
      </div>

      <div className="overflow-x-auto rounded-[16px] border border-[#404040]">
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
            {currentDisputes.length > 0 ? (
              currentDisputes.map((item, index) => (
                <TableRow
                  key={startIndex + index}
                  className="group border-b border-[#404040] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  <TableCell className="py-6 px-8 text-sm font-normal text-white border-none">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-6 px-8 text-sm text-[#D9D9D9] border-none">
                    {item.email}
                  </TableCell>
                  <TableCell className="py-6 px-8 text-sm text-[#D9D9D9] border-none">
                    {formatDate(item.createdAt ?? item.submittedOn)}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-[#717171]">
                  No disputes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#404040]">
          <p className="text-sm text-[#D9D9D9]">
            Showing <span className="text-white font-medium">{startIndex + 1}</span> to{" "}
            <span className="text-white font-medium">
              {Math.min(endIndex, data.length)}
            </span>{" "}
            of <span className="text-white font-medium">{data.length}</span> disputes
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-[8px] border border-[#404040] text-[#D9D9D9] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => goToPage(number)}
                  className={`min-w-[40px] h-[40px] rounded-[8px] text-sm font-medium transition-colors ${currentPage === number
                    ? "bg-[#582BB3] text-white"
                    : "text-[#D9D9D9] hover:bg-white/5"
                    }`}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-[8px] border border-[#404040] text-[#D9D9D9] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


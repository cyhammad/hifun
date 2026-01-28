"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", users: 300 },
  { month: "Feb", users: 400 },
  { month: "Mar", users: 80 },
  { month: "Apr", users: 250 },
  { month: "May", users: 280 },
  { month: "Jun", users: 180 },
  { month: "Jul", users: 300 },
  { month: "Aug", users: 190 },
  { month: "Sept", users: 80 },
  { month: "Oct", users: 250 },
  { month: "Nov", users: 400 },
  { month: "Dec", users: 80 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "#FFBD1D",
  },
};

export function UsersRegisteredChart() {
  return (
    <div className="bg-[#080707] w-full h-[285px] rounded-[12px] pt-[20px] pr-[24px] pb-[24px] pl-[24px] border border-[#404040] shadow-2xl flex flex-col gap-[16px] font-sans">
      <div className="flex flex-col">
        <h3 className="text-[#ffffff] text-[16px] font-normal">
          Users Registered
        </h3>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={chartData}
            margin={{
              left: -20,
              right: 0,
              top: 20,
              bottom: 0,
            }}
            barGap={0}
          >
            <CartesianGrid vertical={false} stroke="#ffffff15" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#717171", fontSize: 12, fontWeight: 300 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#717171", fontSize: 12, fontWeight: 300 }}
              domain={[0, 450]}
              ticks={[10, 100, 200, 300, 400]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="users"
              fill="var(--color-users)"
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

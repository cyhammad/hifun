"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const defaultChartData = [
  { month: "Jan", users: 0 },
  { month: "Feb", users: 0 },
  { month: "Mar", users: 0 },
  { month: "Apr", users: 0 },
  { month: "May", users: 0 },
  { month: "Jun", users: 0 },
  { month: "Jul", users: 0 },
  { month: "Aug", users: 0 },
  { month: "Sept", users: 0 },
  { month: "Oct", users: 0 },
  { month: "Nov", users: 0 },
  { month: "Dec", users: 0 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "#FFBD1D",
  },
};

export function UsersRegisteredChart({ data = defaultChartData }) {
  const chartData = data?.length ? data : defaultChartData;
  const maxUsers = Math.max(...chartData.map((d) => d.users), 1);

  return (
    <div className="w-full rounded-[12px] pt-[20px] pr-[24px] pb-[24px] pl-[24px] border border-[#404040] shadow-2xl flex flex-col gap-[16px] font-sans">
      <div className="flex flex-col">
        <h3 className="text-[#ffffff] text-[16px] font-normal">
          Users Registered
        </h3>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ChartContainer config={chartConfig} className="h-full max-h-[285px] w-full">
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
              domain={[0, Math.ceil(maxUsers * 1.2) || 10]}
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

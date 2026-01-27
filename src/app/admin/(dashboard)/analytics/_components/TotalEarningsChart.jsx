"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", earnings: 12000, projected: 8000 },
  { month: "Feb", earnings: 16000, projected: 15000 },
  { month: "Mar", earnings: 10000, projected: 14500 },
  { month: "Apr", earnings: 11000, projected: 14000 },
  { month: "May", earnings: 15000, projected: 18000 },
  { month: "Jun", earnings: 14000, projected: 10000 },
  { month: "Jul", earnings: 24000, projected: 9000 },
  { month: "Aug", earnings: 23000, projected: 15000 },
  { month: "Sep", earnings: 27000, projected: 14000 },
  { month: "Oct", earnings: 20000, projected: 22000 },
  { month: "Nov", earnings: 24000, projected: 23000 },
  { month: "Dec", earnings: 26000, projected: 28000 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#582BB3",
  },
  projected: {
    label: "Projected",
    color: "#FFBD1D",
  },
};

export function TotalEarningsChart() {
  return (
    <div className="bg-[#080707] w-full min-w-[670px] h-[330px] rounded-[16px] p-[24px] border border-[#404040] shadow-2xl flex flex-col gap-2">
      <div className="flex flex-col">
        <h3
          className="text-white text-[14px] font-normal"
          style={{ fontFamily: "var(--font-nunito-sans)" }}
        >
          Total Earnings
        </h3>
      </div>
      <div className="flex-1 w-full relative">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={chartData}
            margin={{
              left: -20,
              right: 12,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#ffffff10" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) => value}
              tick={{ fill: "#717171", fontSize: 12, fontWeight: 300 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 1000}K`
              }
              tick={{ fill: "#717171", fontSize: 12, fontWeight: 300 }}
              domain={[0, 30000]}
              ticks={[0, 10000, 20000, 30000]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="earnings"
              type="monotone"
              fill="url(#fillEarnings)"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#8B5CF6",
                stroke: "#191919",
                strokeWidth: 2,
              }}
            />
            <Area
              dataKey="projected"
              type="monotone"
              fill="transparent"
              stroke="#FBBF24"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}

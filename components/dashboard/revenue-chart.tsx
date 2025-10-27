"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";

interface RevenueData {
  month: string;
  current: number;
  previous: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const revenueData: RevenueData[] = [
  { month: "Jan", current: 8000000, previous: 12000000 },
  { month: "Feb", current: 17000000, previous: 10000000 },
  { month: "Mar", current: 18000000, previous: 8000000 },
  { month: "Apr", current: 10000000, previous: 10000000 },
  { month: "May", current: 12000000, previous: 18000000 },
  { month: "Jun", current: 25000000, previous: 22000000 },
];

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);

  if (active && payload && payload.length) {
    return (
      <div
        className="p-2 sm:p-3 border rounded-lg shadow-lg text-xs sm:text-sm"
        style={{
          backgroundColor: bgColors.card,
          borderColor: borderColors.light,
        }}
      >
        <p
          className="font-medium mb-1"
          style={{
            color: textColors.primary,
          }}
        >
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            style={{
              color: textColors.muted,
            }}
          >
            {entry.name}:{" "}
            <span className="font-medium" style={{ color: textColors.primary }}>
              {entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function formatYAxis(value: number) {
  return `${value / 1000000}M`;
}

interface RevenueChartProps {
  className?: string;
}

export function RevenueChart({ className = "" }: RevenueChartProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);
  const chartColors = colors.getChart(theme);

  return (
    <Card
      className={`border-none shadow-none rounded-2xl h-full w-full ${className}`}
      style={{
        backgroundColor:
          theme === "dark"
            ? colors.background.darkCard
            : colors.background.secondary,
      }}
    >
      <CardHeader className="pb-2 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-4">
          <CardTitle
            className="font-medium text-sm sm:text-base"
            style={{
              color: textColors.primary,
            }}
          >
            Revenue
          </CardTitle>
          <div
            className="w-[2px] h-5 rounded-full my-2 sm:my-4 hidden sm:block"
            style={{ backgroundColor: `${textColors.primary}20` }}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: chartColors.actual }}
              />
              <span style={{ color: textColors.secondary }}>Current Week</span>
              <span
                className="font-semibold"
                style={{ color: textColors.primary }}
              >
                $58,211
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: textColors.primary }}
              />
              <span style={{ color: textColors.secondary }}>Previous Week</span>
              <span
                className="font-semibold"
                style={{ color: textColors.primary }}
              >
                $68,768
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={revenueData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={borderColors.light}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke={textColors.secondary}
              style={{ fontSize: "10px" }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke={textColors.secondary}
              style={{ fontSize: "10px" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              domain={[0, 30000000]}
              ticks={[0, 10000000, 20000000, 30000000]}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="natural"
              dataKey="current"
              stroke={chartColors.actual}
              strokeWidth={2}
              dot={false}
              name="Current Week"
            />
            <Line
              type="natural"
              dataKey="previous"
              stroke={textColors.primary}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Previous Week"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

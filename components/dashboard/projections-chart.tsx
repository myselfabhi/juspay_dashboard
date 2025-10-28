"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { animations } from "@/lib/animations";

interface ProjectionData {
  month: string;
  projected: number;
  actual: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const projectionData: ProjectionData[] = [
  { month: "Jan", projected: 18, actual: 20 },
  { month: "Feb", projected: 25, actual: 23 },
  { month: "Mar", projected: 22, actual: 24 },
  { month: "Apr", projected: 28, actual: 26 },
  { month: "May", projected: 24, actual: 22 },
  { month: "Jun", projected: 26, actual: 28 },
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
            <span
              className="font-medium"
              style={{
                color: textColors.primary,
              }}
            >
              {entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

interface ProjectionsChartProps {
  className?: string;
}

export function ProjectionsChart({ className = "" }: ProjectionsChartProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);
  const chartColors = colors.getChart(theme);
  return (
    <Card
      className={`border-none shadow-none h-full ${animations.cardHover} ${animations.fadeInUp} ${className}`}
      style={{
        backgroundColor:
          theme === "dark"
            ? colors.background.darkSecondary
            : colors.background.secondary,
      }}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle
          className="font-medium text-xs sm:text-sm"
          style={{
            color: textColors.primary,
          }}
        >
          Projections vs Actuals
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] sm:h-[calc(100%-60px)] -mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={projectionData} barCategoryGap="15%">
            <CartesianGrid vertical={false} stroke={borderColors.light} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              stroke={textColors.muted}
              style={{ fontSize: "10px" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke={textColors.muted}
              style={{ fontSize: "10px" }}
              width={30}
              domain={[0, 35]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(168, 197, 218, 0.1)" }}
            />
            <Bar
              dataKey="projected"
              stackId="a"
              fill={chartColors.projected}
              radius={[0, 0, 4, 4]}
              name="Projected"
              maxBarSize={35}
            />
            <Bar
              dataKey="actual"
              stackId="a"
              fill={chartColors.actual}
              radius={[4, 4, 0, 0]}
              name="Actual"
              maxBarSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-3 sm:gap-4 mt-2 sm:mt-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm"
              style={{
                backgroundColor: chartColors.projected,
              }}
            />
            <span
              className="text-xs"
              style={{
                color: textColors.muted,
              }}
            >
              Projected
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm"
              style={{
                backgroundColor: chartColors.actual,
              }}
            />
            <span
              className="text-xs"
              style={{
                color: textColors.muted,
              }}
            >
              Actual
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

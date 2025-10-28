"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "../DonutSegment";
import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";

interface SalesData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface SalesDonutChartProps {
  className?: string;
}

export function SalesDonutChart({ className = "" }: SalesDonutChartProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const chartColors = colors.getChart(theme);

  const salesData: SalesData[] = [
    {
      label: "Direct",
      value: 300.56,
      color: chartColors.direct,
      percentage: 44.4,
    },
    {
      label: "Affiliate",
      value: 135.18,
      color: chartColors.affiliate,
      percentage: 20.0,
    },
    {
      label: "Sponsored",
      value: 154.02,
      color: chartColors.sponsored,
      percentage: 22.8,
    },
    {
      label: "E-mail",
      value: 48.96,
      color: chartColors.email,
      percentage: 7.2,
    },
  ];

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
      <CardHeader>
        <CardTitle
          className="font-semibold"
          style={{
            fontSize: typography.fontSize.sm,
            color: textColors.primary,
          }}
        >
          Total Sales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center -mt-7">
          <DonutChart size={120} data={salesData} />
        </div>

        <div className="space-y-6">
          {salesData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  style={{
                    fontSize: typography.fontSize.xs,
                    color: textColors.primary,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className="font-medium"
                style={{
                  fontSize: typography.fontSize.xs,
                  color: textColors.primary,
                }}
              >
                ${item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
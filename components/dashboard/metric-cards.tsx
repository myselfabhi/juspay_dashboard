"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { colors, typography, borderRadius } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    isPositive: boolean;
  };
  backgroundColor: string;
}

function MetricCard({
  title,
  value,
  change,
  backgroundColor,
}: MetricCardProps) {
  const { theme } = useTheme();
  const TrendIcon = change.isPositive ? TrendingUp : TrendingDown;
  const textColors = colors.getText(theme);

  const isLightBackground =
    backgroundColor === colors.background.blue ||
    backgroundColor === colors.background.tertiary ||
    (theme === "light" && backgroundColor === colors.background.secondary);

  const titleColor = isLightBackground
    ? colors.text.secondary
    : textColors.primary;
  const valueColor = isLightBackground
    ? colors.text.primary
    : textColors.primary;
  const changeColor = isLightBackground
    ? colors.text.secondary
    : textColors.secondary;

  return (
    <Card
      className="shadow-none border-none rounded-2xl"
      style={{ backgroundColor }}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle
          className="font-medium text-xs sm:text-sm"
          style={{
            color: titleColor,
          }}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div
            className="font-semibold text-xl sm:text-2xl lg:text-3xl"
            style={{
              color: valueColor,
            }}
          >
            {value}
          </div>
          <div
            className="flex items-center gap-1 text-xs sm:text-sm"
            style={{ color: changeColor }}
          >
            <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{change.value}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardsProps {
  className?: string;
}

export function MetricCards({ className = "" }: MetricCardsProps) {
  const { theme } = useTheme();
  const bgColors = colors.getBackground(theme);

  const metrics = [
    {
      title: "Customers",
      value: "3,781",
      change: { value: "+11.01%", isPositive: true },
      backgroundColor: colors.background.blue,
    },
    {
      title: "Orders",
      value: "1,219",
      change: { value: "-0.03%", isPositive: false },
      backgroundColor:
        theme === "dark"
          ? colors.background.darkSecondary
          : colors.background.secondary,
    },
    {
      title: "Revenue",
      value: "$695",
      change: { value: "+15.03%", isPositive: true },
      backgroundColor:
        theme === "dark"
          ? colors.background.darkSecondary
          : colors.background.secondary,
    },
    {
      title: "Growth",
      value: "30.1%",
      change: { value: "+6.08%", isPositive: true },
      backgroundColor: colors.background.tertiary,
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${className}`}
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          backgroundColor={metric.backgroundColor}
        />
      ))}
    </div>
  );
}

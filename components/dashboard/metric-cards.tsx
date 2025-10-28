"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { animations, createStaggeredAnimation } from "@/lib/animations";
import { useCountUpOnScroll, useCountUp, formatNumber, formatCurrency, formatPercentage } from "@/lib/count-up-hook";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    isPositive: boolean;
  };
  backgroundColor: string;
  numericValue?: number;
  valueType?: 'number' | 'currency' | 'percentage';
}

function MetricCard({
  title,
  value,
  change,
  backgroundColor,
  numericValue,
  valueType = 'number',
}: MetricCardProps) {
  const { theme } = useTheme();
  const TrendIcon = change.isPositive ? TrendingUp : TrendingDown;
  const textColors = colors.getText(theme);

  // Use count-up animation if numericValue is provided
  // For now, let's use the simple version to test
  const { count, isAnimating } = useCountUp(numericValue || 0, {
    duration: 2000,
    delay: 200,
    startOnMount: true,
  });
  
  // Keep ref for potential future use
  const ref = React.useRef<HTMLDivElement>(null);

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

  // Format the displayed value
  const getDisplayValue = () => {
    if (numericValue !== undefined) {
      // Show count-up value if animating, otherwise show original value
      const displayValue = isAnimating ? count : numericValue;
      
      switch (valueType) {
        case 'currency':
          return formatCurrency(displayValue);
        case 'percentage':
          return formatPercentage(displayValue);
        default:
          return formatNumber(displayValue);
      }
    }
    return value;
  };

  return (
    <Card
      className={`shadow-none border-none rounded-2xl ${animations.cardHover} ${animations.fadeInUp}`}
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
            ref={ref}
            className={`font-semibold text-xl sm:text-2xl lg:text-3xl ${animations.animateCountUp}`}
            style={{
              color: valueColor,
            }}
          >
            {getDisplayValue()}
          </div>
          <div
            className={`flex items-center gap-1 text-xs sm:text-sm ${animations.fadeInRight}`}
            style={{ color: changeColor }}
          >
            <TrendIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${animations.iconHover}`} />
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

  const metrics = [
    {
      title: "Customers",
      value: "3,781",
      numericValue: 3781,
      valueType: 'number' as const,
      change: { value: "+11.01%", isPositive: true },
      backgroundColor: colors.background.blue,
    },
    {
      title: "Orders",
      value: "1,219",
      numericValue: 1219,
      valueType: 'number' as const,
      change: { value: "-0.03%", isPositive: false },
      backgroundColor:
        theme === "dark"
          ? colors.background.darkSecondary
          : colors.background.secondary,
    },
    {
      title: "Revenue",
      value: "$695",
      numericValue: 695,
      valueType: 'currency' as const,
      change: { value: "+15.03%", isPositive: true },
      backgroundColor:
        theme === "dark"
          ? colors.background.darkSecondary
          : colors.background.secondary,
    },
    {
      title: "Growth",
      value: "30.1%",
      numericValue: 30.1,
      valueType: 'percentage' as const,
      change: { value: "+6.08%", isPositive: true },
      backgroundColor: colors.background.tertiary,
    },
  ];

  const staggeredCards = createStaggeredAnimation(metrics, 150, 'animate-fade-in-up');

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${className}`}
    >
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={staggeredCards[index].className}
          style={staggeredCards[index].style}
        >
          <MetricCard
            title={metric.title}
            value={metric.value}
            numericValue={metric.numericValue}
            valueType={metric.valueType}
            change={metric.change}
            backgroundColor={metric.backgroundColor}
          />
        </div>
      ))}
    </div>
  );
}

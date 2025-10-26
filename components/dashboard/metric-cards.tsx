"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { colors, typography, borderRadius } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { animations, createStaggerAnimation } from "@/lib/animations";
import { useState, useEffect } from "react";

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
  index,
}: MetricCardProps & { index: number }) {
  const { theme } = useTheme();
  const TrendIcon = change.isPositive ? TrendingUp : TrendingDown;
  const textColors = colors.getText(theme);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Stagger the animation based on index
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (isVisible) {
      // Animate the value if it's a number
      const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
      if (!isNaN(numericValue)) {
        const duration = 1000;
        const steps = 60;
        const stepValue = numericValue / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;
          setAnimatedValue(stepValue * currentStep);
          
          if (currentStep >= steps) {
            setAnimatedValue(numericValue);
            clearInterval(interval);
          }
        }, duration / steps);

        return () => clearInterval(interval);
      } else {
        setAnimatedValue(value);
      }
    }
  }, [isVisible, value]);

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

  const displayValue = typeof value === 'string' && value.includes('$') 
    ? `$${animatedValue.toFixed(0)}`
    : typeof value === 'string' && value.includes('%')
    ? `${animatedValue.toFixed(1)}%`
    : typeof value === 'string' && value.includes(',')
    ? animatedValue.toLocaleString()
    : animatedValue;

  return (
    <Card
      className={`shadow-none border-none rounded-2xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg ${
        isVisible ? 'animate-in fade-in-0 slide-in-from-bottom-4' : 'opacity-0'
      }`}
      style={{ 
        backgroundColor,
        transitionDelay: `${index * 100}ms`
      }}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle
          className="font-medium text-xs sm:text-sm transition-colors duration-300"
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
            className="font-semibold text-xl sm:text-2xl lg:text-3xl transition-all duration-300"
            style={{
              color: valueColor,
            }}
          >
            {displayValue}
          </div>
          <div
            className={`flex items-center gap-1 text-xs sm:text-sm transition-all duration-300 ${
              change.isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <TrendIcon className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
              change.isPositive ? 'hover:scale-110' : 'hover:scale-110'
            }`} />
            <span className="font-medium">{change.value}</span>
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
          index={index}
        />
      ))}
    </div>
  );
}

"use client";

import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { animations } from "@/lib/animations";
import { useState, useEffect } from "react";
import {
  MetricCards,
  ProjectionsChart,
  RevenueChart,
  LocationMap,
  ProductsTable,
  SalesDonutChart,
} from "./dashboard/";

export function DashboardContent() {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`p-4 sm:p-6 min-h-screen transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <h1
        className={`font-semibold mb-4 sm:mb-6 transition-all duration-700 ${
          isLoaded ? 'animate-in fade-in-0 slide-in-from-top-4' : 'opacity-0'
        }`}
        style={{
          fontSize: typography.fontSize.xl,
          color: textColors.primary,
        }}
      >
        eCommerce
      </h1>

      <div className={`mb-4 flex flex-col lg:flex-row gap-4 transition-all duration-700 delay-200 ${
        isLoaded ? 'animate-in fade-in-0 slide-in-from-bottom-4' : 'opacity-0'
      }`}>
        <div className="w-full lg:w-1/2">
          <MetricCards />
        </div>
        <div className="w-full lg:w-1/2">
          <ProjectionsChart />
        </div>
      </div>

      <div className={`flex flex-col xl:flex-row w-full gap-4 mb-4 items-stretch transition-all duration-700 delay-400 ${
        isLoaded ? 'animate-in fade-in-0 slide-in-from-bottom-4' : 'opacity-0'
      }`}>
        <div className="w-full xl:w-[70%] flex">
          <RevenueChart />
        </div>
        <div className="w-full xl:w-[30%] flex">
          <LocationMap />
        </div>
      </div>

      <div className={`flex flex-col xl:flex-row w-full gap-4 items-stretch transition-all duration-700 delay-600 ${
        isLoaded ? 'animate-in fade-in-0 slide-in-from-bottom-4' : 'opacity-0'
      }`}>
        <div className="w-full xl:w-[70%] flex">
          <ProductsTable />
        </div>
        <div className="w-full xl:w-[30%] flex">
          <SalesDonutChart />
        </div>
      </div>
    </div>
  );
}

"use client";

import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { animations } from "@/lib/animations";
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

  return (
    <div className={`p-4 sm:p-6 min-h-screen transition-colors ${animations.pageEnter} relative overflow-hidden`}>
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/5 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-500/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      
      <h1
        className={`font-semibold mb-4 sm:mb-6 ${animations.fadeInDown} relative z-10`}
        style={{
          fontSize: typography.fontSize.xl,
          color: textColors.primary,
        }}
      >
        eCommerce
      </h1>

      <div className={`mb-4 flex flex-col lg:flex-row gap-4 ${animations.fadeInUp} relative z-10`}>
        <div className="w-full lg:w-1/2">
          <MetricCards />
        </div>
        <div className="w-full lg:w-1/2">
          <ProjectionsChart />
        </div>
      </div>

      <div className={`flex flex-col xl:flex-row w-full gap-4 mb-4 items-stretch ${animations.fadeInUp} relative z-10`} style={{ animationDelay: '200ms' }}>
        <div className="w-full xl:w-[70%] flex">
          <RevenueChart />
        </div>
        <div className="w-full xl:w-[30%] flex">
          <LocationMap />
        </div>
      </div>

      <div className={`flex flex-col xl:flex-row w-full gap-4 items-stretch ${animations.fadeInUp} relative z-10`} style={{ animationDelay: '400ms' }}>
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

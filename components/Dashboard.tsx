"use client";

import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
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

  return (
    <div className="p-4 sm:p-6 min-h-screen transition-colors">
      <h1
        className="font-semibold mb-4 sm:mb-6"
        style={{
          fontSize: typography.fontSize.xl,
          color: textColors.primary,
        }}
      >
        eCommerce
      </h1>

      <div className="mb-4 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <MetricCards />
        </div>
        <div className="w-full lg:w-1/2">
          <ProjectionsChart />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row w-full gap-4 mb-4 items-stretch">
        <div className="w-full xl:w-[70%] flex">
          <RevenueChart />
        </div>
        <div className="w-full xl:w-[30%] flex">
          <LocationMap />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row w-full gap-4 items-stretch">
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

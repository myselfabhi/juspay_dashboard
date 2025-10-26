"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";

interface Location {
  city: string;
  value: string;
}

const locations: Location[] = [
  { city: "New York", value: "72K" },
  { city: "San Francisco", value: "39K" },
  { city: "Sydney", value: "25K" },
  { city: "Singapore", value: "61K" },
];

interface LocationMapProps {
  className?: string;
}

export function LocationMap({ className = "" }: LocationMapProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);

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
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle
          className="font-medium text-xs sm:text-sm"
          style={{
            color: textColors.primary,
          }}
        >
          Revenue by Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[84px] -mt-6 rounded-lg flex items-center justify-center">
          <Image
            src="/mapp.png"
            alt="Map"
            width={1000}
            height={1000}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-1">
          {locations.map((location) => {
            const numericValue = Number.parseInt(
              location.value.replace("K", "")
            );
            const maxValue = 72;
            const progressPercentage = (numericValue / maxValue) * 100;

            return (
              <div
                key={location.city}
                className="p-2 rounded transition-colors cursor-pointer"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                  <span style={{ color: textColors.primary }}>
                    {location.city}
                  </span>
                  <span
                    className="font-medium"
                    style={{ color: textColors.primary }}
                  >
                    {location.value}
                  </span>
                </div>
                <div
                  className="w-full rounded-full h-1"
                  style={{ backgroundColor: borderColors.light }}
                >
                  <div
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: textColors.muted,
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

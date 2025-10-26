export const responsiveClasses = {
  container: "w-full  mx-auto px-4 sm:px-6 lg:px-8",
  grid: {
    twoCol: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    threeCol: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
    fourCol: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
  },
  flex: {
    rowToCol: "flex flex-col lg:flex-row gap-4",
    rowToColMd: "flex flex-col md:flex-row gap-4",
    rowToColXl: "flex flex-col xl:flex-row gap-4",
  },
  width: {
    halfOnDesktop: "w-full lg:w-1/2",
    seventyOnXl: "w-full xl:w-[70%]",
    thirtyOnXl: "w-full xl:w-[30%]",
  },
  spacing: {
    padding: "p-4 sm:p-6",
    marginBottom: "mb-4 sm:mb-6",
    gap: "gap-4 sm:gap-6",
  },
  text: {
    heading: "text-lg sm:text-xl lg:text-2xl",
    body: "text-sm sm:text-base",
    small: "text-xs sm:text-sm",
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]}px)`,
} as const;

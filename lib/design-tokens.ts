export const colors = {
  primary: {
    black: "#1C1C1C",
    gray: "#6B7280",
    lightGray: "#A8C5DA",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F6F9FB",
    tertiary: "#E5ECF6",
    blue: "#E3F5FF",
    dark: "#1c1c1c",
    darkSecondary: "#2D2D2D",
    darkTertiary: "#3A3A3A",
    darkCard: "#252525",
    darkHover: "#2A2A2A",
  },
  chart: {
    projected: "#D0DFEB",
    actual: "#59A8D4",
    direct: "#1C1C1C",
    affiliate: "#4AA785",
    sponsored: "#8A8CD9",
    email: "#B1E3FF",
    darkProjected: "#4A5568",
    darkActual: "#59A8D4",
    darkDirect: "#FFFFFF",
    darkAffiliate: "#4AA785",
    darkSponsored: "#8A8CD9",
    darkEmail: "#63B3ED",
  },
  border: {
    light: "#E5ECF6",
    medium: "#A8C5DA",
    dark: "#3A3A3A",
    darkLight: "#4A4A4A",
  },
  text: {
    primary: "#1C1C1C",
    secondary: "#6B7280",
    muted: "#A8C5DA",
    dark: "#FFFFFF",
    darkSecondary: "#B3B3B3",
    darkMuted: "#8A8A8A",
  },
  getBackground: (theme: "light" | "dark") => ({
    primary:
      theme === "dark" ? colors.background.dark : colors.background.primary,
    secondary:
      theme === "dark"
        ? colors.background.darkSecondary
        : colors.background.secondary,
    tertiary:
      theme === "dark"
        ? colors.background.darkTertiary
        : colors.background.tertiary,
    card: theme === "dark" ? colors.background.darkCard : "#FFFFFF",
    hover:
      theme === "dark"
        ? colors.background.darkHover
        : colors.background.primary,
  }),
  getText: (theme: "light" | "dark") => ({
    primary: theme === "dark" ? colors.text.dark : colors.text.primary,
    secondary:
      theme === "dark" ? colors.text.darkSecondary : colors.text.secondary,
    muted: theme === "dark" ? colors.text.darkMuted : colors.text.muted,
  }),
  getBorder: (theme: "light" | "dark") => ({
    light: theme === "dark" ? colors.border.dark : colors.border.light,
    medium: theme === "dark" ? colors.border.darkLight : colors.border.medium,
  }),
  getChart: (theme: "light" | "dark") => ({
    projected:
      theme === "dark" ? colors.chart.darkProjected : colors.chart.projected,
    actual: theme === "dark" ? colors.chart.darkActual : colors.chart.actual,
    direct: theme === "dark" ? colors.chart.darkDirect : colors.chart.direct,
    affiliate:
      theme === "dark" ? colors.chart.darkAffiliate : colors.chart.affiliate,
    sponsored:
      theme === "dark" ? colors.chart.darkSponsored : colors.chart.sponsored,
    email: theme === "dark" ? colors.chart.darkEmail : colors.chart.email,
  }),
} as const;

export const typography = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "48px",
  "5xl": "64px",
} as const;

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
} as const;

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juspay Dashboard - Abhinav Verma",
  description:
    "A modern Next.js dashboard application for Juspay with Order List management and eCommerce analytics. Built by Abhinav Verma with TypeScript, Tailwind CSS, and advanced UI components.",
  keywords: ["nextjs", "dashboard", "tailwindcss", "react", "typescript", "juspay", "abhinav verma"],
  authors: [{ name: "Abhinav Verma" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Juspay Dashboard - Abhinav Verma",
    description: "Modern Next.js dashboard with Order List management and eCommerce analytics",
    url: "https://github.com/myselfabhi/Juspay-assignment",
    siteName: "Juspay Dashboard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased transition-colors`}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

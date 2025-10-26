"use client";

import { useTheme } from "@/lib/theme-context";
import { colors } from "@/lib/design-tokens";
import { Sidebar } from "./Sidebar";
import { Header, SidebarProvider } from "./Header";
import { NotificationsSidebar } from "./NotificationsSidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { theme } = useTheme();
  const bgColors = colors.getBackground(theme);

  return (
    <SidebarProvider>
      <div
        className="flex h-screen relative transition-colors"
        style={{ backgroundColor: bgColors.primary }}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <NotificationsSidebar />
      </div>
    </SidebarProvider>
  );
}

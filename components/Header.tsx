"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, createContext, useContext, useEffect } from "react";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import {
  CollapsableIcon,
  StarIcon,
  SunIcon,
  ReloadIcon,
  BellIcon,
} from "./Icon";

interface HeaderProps {
  breadcrumbs?: {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
  }[];
  title?: string;
}

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isNotificationsOpen: boolean;
  toggleNotifications: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        isNotificationsOpen,
        toggleNotifications,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function Header({ breadcrumbs, title }: HeaderProps) {
  const { toggleSidebar, toggleNotifications, isNotificationsOpen } =
    useSidebar();
  const { theme, toggleTheme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const defaultBreadcrumbs = [
    {
      label: "Dashboards",
    },
    {
      label: "Default",
      active: true,
    },
  ];

  const breadcrumbItems = breadcrumbs || defaultBreadcrumbs;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchValue("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      const input = document.querySelector(
        'input[placeholder="Search..."]'
      ) as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <>
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: textColors.muted }}
                />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  className="pl-12 pr-20 py-4 text-lg rounded-xl outline-none w-full transition-colors"
                  style={{
                    backgroundColor: bgColors.card,
                    borderColor: colors.getBorder(theme).light,
                    color: textColors.primary,
                  }}
                  autoFocus
                />
                {searchValue && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-opacity-50 transition-colors"
                    style={{ color: textColors.muted }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <kbd
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono px-2 py-1 rounded"
                  style={{
                    color: textColors.muted,
                    backgroundColor: bgColors.hover,
                  }}
                >
                  ESC
                </kbd>
              </div>
            </form>
          </div>
        </div>
      )}

      <header
        className="border-b px-3 sm:px-6 py-3 transition-colors"
        style={{
          backgroundColor: bgColors.card,
          borderColor: colors.getBorder(theme).light,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md transition-colors"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = bgColors.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              aria-label="Toggle sidebar"
            >
              <CollapsableIcon size={20} className="cursor-pointer" />
            </button>
            <StarIcon size={20} className="cursor-pointer hidden sm:block" />
            <nav
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              aria-label="Breadcrumb"
            >
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center gap-1 sm:gap-2">
                  <span
                    style={{
                      color: item.active
                        ? textColors.primary
                        : `${textColors.primary}40`,
                    }}
                  >
                    {item.label}
                  </span>
                  {index < breadcrumbItems.length - 1 && (
                    <span style={{ color: textColors.muted }}>/</span>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: textColors.muted }}
              />
              <Input
                placeholder="Search"
                className="pl-9 pr-12 rounded-[10px] outline-none w-48 lg:w-64 transition-colors"
                style={{ backgroundColor: `${textColors.primary}0D` }}
              />
              <kbd
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono"
                style={{ color: textColors.muted }}
              >
                ⌘/
              </kbd>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-md transition-colors md:hidden"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = bgColors.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                aria-label="Search"
              >
                <Search
                  className="w-4 h-4"
                  style={{ color: textColors.muted }}
                />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md transition-all duration-200 hidden sm:block relative overflow-hidden"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = bgColors.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } theme`}
              >
                <div className="relative">
                  {theme === "light" ? (
                    <SunIcon
                      size={20}
                      className="transition-transform duration-200 hover:rotate-180"
                    />
                  ) : (
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{ color: textColors.primary }}
                      className="transition-transform duration-200 hover:rotate-12"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </div>
              </button>
              <button
                className="p-2 rounded-md transition-colors hidden sm:block"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = bgColors.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                aria-label="View history"
              >
                <ReloadIcon size={20} />
              </button>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-md transition-colors relative"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = bgColors.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                aria-label="Notifications"
              >
                <BellIcon size={20} />
              </button>
              {isNotificationsOpen && (
                <button
                  onClick={toggleNotifications}
                  className="p-2 rounded-md transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = bgColors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  aria-label="Close notifications"
                >
                  <CollapsableIcon size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

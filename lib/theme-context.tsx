"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration and theme initialization
  useEffect(() => {
    // Set hydrated state first
    setIsHydrated(true);
    
    // Apply theme immediately to prevent flash
    const applyTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    };
    
    // Get theme from localStorage or system preference
    try {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        applyTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(prefersDark ? "dark" : "light");
      }
    } catch (error) {
      // Fallback to light theme if localStorage is not available
      applyTheme("light");
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      // Only apply transitions and save to localStorage after hydration
      document.documentElement.style.transition =
        "background-color 0.2s ease, color 0.2s ease";
      localStorage.setItem("theme", theme);

      const timer = setTimeout(() => {
        document.documentElement.style.transition = "";
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [theme, isHydrated]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isHydrated }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

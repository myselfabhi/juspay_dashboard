"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { User, Building2, FileText, Users, ChevronRight } from "lucide-react";
import { useSidebar } from "./Header";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { DefaultIcon, EcomIcon, ProjectsIcon, OnlineCourseIcon } from "./Icon";

interface IconProps {
  className?: string;
  size?: number;
}

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ComponentType<IconProps>;
  href?: string;
  children?: MenuItem[];
}

const favoriteItems: MenuItem[] = [
  { key: "fav-overview", label: "Overview" },
  { key: "fav-projects", label: "Projects" },
];

const dashboardGroups: MenuItem[] = [
  {
    key: "dash-default",
    label: "Default",
    icon: DefaultIcon,
    href: "/",
  },
  {
    key: "dash-ecom",
    label: "eCommerce",
    icon: EcomIcon,
    children: [
      { key: "dash-ecom-overview", label: "Overview" },
      { key: "dash-ecom-orders", label: "Orders", href: "/orders" },
      { key: "dash-ecom-products", label: "Products" },
    ],
  },
  {
    key: "dash-projects",
    label: "Projects",
    icon: ProjectsIcon,
    children: [
      { key: "dash-projects-list", label: "All Projects" },
      { key: "dash-projects-board", label: "Boards" },
    ],
  },
  {
    key: "dash-courses",
    label: "Online Courses",
    icon: OnlineCourseIcon,
    children: [
      { key: "dash-courses-my", label: "My Courses" },
      { key: "dash-courses-browse", label: "Browse" },
    ],
  },
];

const pagesGroups: MenuItem[] = [
  {
    key: "page-user",
    label: "User Profile",
    icon: User,
    children: [
      { key: "page-user-overview", label: "Overview" },
      { key: "page-user-projects", label: "Projects" },
      { key: "page-user-campaigns", label: "Campaigns" },
      { key: "page-user-docs", label: "Documents" },
      { key: "page-user-followers", label: "Followers" },
    ],
  },
  {
    key: "page-account",
    label: "Account",
    icon: User,
    children: [
      { key: "page-account-settings", label: "Settings" },
      { key: "page-account-billing", label: "Billing" },
    ],
  },
  {
    key: "page-corporate",
    label: "Corporate",
    icon: Building2,
    children: [
      { key: "page-corp-teams", label: "Teams" },
      { key: "page-corp-policies", label: "Policies" },
    ],
  },
  {
    key: "page-blog",
    label: "Blog",
    icon: FileText,
    children: [
      { key: "page-blog-posts", label: "Posts" },
      { key: "page-blog-new", label: "New Post" },
    ],
  },
  {
    key: "page-social",
    label: "Social",
    icon: Users,
    children: [
      { key: "page-social-feed", label: "Feed" },
      { key: "page-social-messages", label: "Messages" },
    ],
  },
];

interface DotRowProps {
  label: string;
  active?: boolean;
}

function DotRow({ label, active }: DotRowProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);

  return (
    <div
      className="flex items-center gap-2 text-sm py-1.5 select-none"
      style={{ color: active ? textColors.primary : colors.primary.lightGray }}
      role="button"
      tabIndex={0}
    >
      <Image src="/dot.png" alt="Dot" width={6} height={6} />
      <span>{label}</span>
    </div>
  );
}

interface GroupItemProps {
  item: MenuItem;
  expanded: boolean;
  onToggle: () => void;
  activeKey: string | null;
  onSelectLeaf: (key: string, href?: string) => void;
  variant?: "default" | "muted";
}

function GroupItem({
  item,
  expanded,
  onToggle,
  activeKey,
  onSelectLeaf,
  variant = "default",
}: GroupItemProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);

  const Icon = item.icon;
  const isActive = activeKey?.startsWith(item.key) ?? false;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-full">
      <button
        onClick={
          hasChildren ? onToggle : () => onSelectLeaf(item.key, item.href)
        }
        aria-expanded={hasChildren ? expanded : undefined}
        className={`group w-full flex items-center rounded-[10px] px-2 py-2 text-sm transition relative ${
          hasChildren ? "justify-between" : "justify-start"
        }`}
        style={{
          backgroundColor: isActive ? bgColors.secondary : "transparent",
          color: isActive
            ? textColors.primary
            : variant === "muted"
            ? colors.primary.lightGray
            : textColors.primary,
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = bgColors.hover;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
              <path
                d="M0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2V14C4 15.1046 3.10457 16 2 16C0.895431 16 0 15.1046 0 14V2Z"
                fill={textColors.primary}
              />
            </svg>
          </div>
        )}

        <span className="flex items-center gap-2">
          {hasChildren && (
            <ChevronRight
              className="h-4 w-4 shrink-0 transition-transform duration-200"
              style={{
                color: expanded ? textColors.primary : colors.primary.lightGray,
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
          {Icon ? <Icon size={16} className="h-4 w-4 shrink-0" /> : null}
          <span>{item.label}</span>
        </span>
      </button>

      <div
        className={`overflow-hidden pl-6 ${
          expanded ? "max-h-96 py-1" : "max-h-0"
        }`}
      >
        {item.children?.map((leaf) => {
          const selected = activeKey === leaf.key;
          return (
            <button
              key={leaf.key}
              onClick={() => onSelectLeaf(leaf.key, leaf.href)}
              className="w-full text-left text-sm rounded-md px-2 py-1.5 mb-0.5 transition"
              style={{
                backgroundColor: selected ? bgColors.tertiary : "transparent",
                color: textColors.primary,
              }}
              onMouseEnter={(e) => {
                if (!selected) {
                  e.currentTarget.style.backgroundColor = bgColors.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {leaf.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);
  const [tab, setTab] = React.useState<"Favorites" | "Recently">("Favorites");
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    "dash-default": true,
    "page-user": true,
  });

  const getActiveKeyFromPath = React.useCallback(() => {
    if (pathname === "/orders") {
      return "dash-ecom-orders";
    }
    if (pathname === "/") {
      return "dash-default";
    }
    return "dash-default";
  }, [pathname]);

  const [activeKey, setActiveKey] = React.useState<string | null>(
    getActiveKeyFromPath()
  );

  React.useEffect(() => {
    const newActiveKey = getActiveKeyFromPath();
    setActiveKey(newActiveKey);

    if (newActiveKey === "dash-ecom-orders") {
      setExpanded((prev) => ({ ...prev, "dash-ecom": true }));
    }
  }, [getActiveKeyFromPath]);

  const toggle = (key: string) =>
    setExpanded((s) => ({ ...s, [key]: !s[key] }));

  const handleSelectLeaf = (key: string, href?: string) => {
    setActiveKey(key);
    if (href) {
      router.push(href);
    }
  };

  return (
    <>
      {!isCollapsed && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`${
          isCollapsed ? "w-0 lg:w-0" : "w-64 lg:w-64"
        } fixed lg:relative top-0 left-0 h-full border-r flex flex-col transition-all duration-300 overflow-hidden z-50 lg:z-auto`}
        style={{
          backgroundColor:
            theme === "dark" ? colors.background.dark : "#FFFFFF",
          borderColor: borderColors.light,
        }}
      >
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <Image
              src="/user.png"
              alt="User"
              width={1000}
              height={1000}
              className="rounded-full h-6 w-6"
            />
            <span
              className="font-medium text-[14px]"
              style={{ color: textColors.primary }}
            >
              ByeWind
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div
              className="inline-flex items-center rounded-full text-[14px]"
              role="tablist"
            >
              {(["Favorites", "Recently"] as const).map((t) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t)}
                    className="px-3 py-1 rounded-full cursor-pointer transition"
                    style={{
                      color: active
                        ? `${textColors.primary}40`
                        : `${textColors.primary}20`,
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <nav className="space-y-1" aria-label={tab}>
              {(tab === "Favorites" ? favoriteItems : favoriteItems).map(
                (it, i) => (
                  <DotRow key={it.key} label={it.label} active={i === 0} />
                )
              )}
            </nav>
          </div>

          <div className="px-4 pb-4">
            <div
              className="text-[14px] mb-2 font-medium mt-4"
              style={{ color: `${textColors.primary}40` }}
            >
              Dashboards
            </div>
            <nav className="space-y-1" aria-label="Dashboards">
              {dashboardGroups.map((group) => (
                <GroupItem
                  key={group.key}
                  item={group}
                  expanded={!!expanded[group.key]}
                  onToggle={() => toggle(group.key)}
                  activeKey={activeKey}
                  onSelectLeaf={handleSelectLeaf}
                  variant="default"
                />
              ))}
            </nav>
          </div>

          <div className="px-4 pb-4">
            <div
              className="text-[14px] mb-2 font-medium mt-4"
              style={{ color: `${textColors.primary}40` }}
            >
              Pages
            </div>
            <nav className="space-y-1" aria-label="Pages">
              {pagesGroups.map((group) => (
                <GroupItem
                  key={group.key}
                  item={group}
                  expanded={!!expanded[group.key]}
                  onToggle={() => toggle(group.key)}
                  activeKey={activeKey}
                  onSelectLeaf={handleSelectLeaf}
                  variant="default"
                />
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}

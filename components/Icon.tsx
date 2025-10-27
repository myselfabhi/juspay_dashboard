"use client";

import { useTheme } from "@/lib/theme-context";
import { colors } from "@/lib/design-tokens";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const iconMap = {
  user: "/icons/user.svg",
  broadcast: "/icons/broadcast.svg",
  bug: "/icons/bug.svg",
  reload: "/icons/reload.svg",
  bell: "/icons/bell.svg",
  sun: "/icons/sun.svg",
  star: "/icons/star.svg",
  collapsable: "/icons/collapsable.svg",
  onlinecourse: "/icons/onlinecourse.svg",
  ecom: "/icons/ecom.svg",
  projects: "/icons/projects.svg",
  default: "/icons/default.svg",
  add: "/icons/add.svg",
  arrowdown: "/icons/arrowdown.svg",
  arrowleft: "/icons/arrowleft.svg",
  arrowright: "/icons/arrowright.svg",
  calendar: "/icons/calendar.svg",
  filter: "/icons/filter.svg",
} as const;

type IconName = keyof typeof iconMap;

export function Icon({
  name,
  size = 20,
  className = "",
  style = {},
}: IconProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);

  const iconPath = iconMap[name as IconName];

  if (!iconPath) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <img
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={{
        filter:
          theme === "dark"
            ? "brightness(0) saturate(100%) invert(100%)"
            : "brightness(0) saturate(100%) invert(0%)",
        ...style,
      }}
    />
  );
}

export function UserIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="user" size={size} className={className} />;
}

export function BroadcastIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="broadcast" size={size} className={className} />;
}

export function BugIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="bug" size={size} className={className} />;
}

export function ReloadIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="reload" size={size} className={className} />;
}

export function BellIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="bell" size={size} className={className} />;
}

export function SunIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="sun" size={size} className={className} />;
}

export function StarIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="star" size={size} className={className} />;
}

export function CollapsableIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="collapsable" size={size} className={className} />;
}

export function OnlineCourseIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="onlinecourse" size={size} className={className} />;
}

export function EcomIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="ecom" size={size} className={className} />;
}

export function ProjectsIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="projects" size={size} className={className} />;
}

export function DefaultIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="default" size={size} className={className} />;
}

export function AddIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="add" size={size} className={className} />;
}

export function ArrowDownIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="arrowdown" size={size} className={className} />;
}

export function ArrowLeftIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="arrowleft" size={size} className={className} />;
}

export function ArrowRightIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="arrowright" size={size} className={className} />;
}

export function CalendarIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="calendar" size={size} className={className} />;
}

export function FilterIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Icon name="filter" size={size} className={className} />;
}

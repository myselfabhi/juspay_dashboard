"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "./Header";
import Image from "next/image";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { BugIcon, UserIcon, BroadcastIcon } from "./Icon";

const activities = [
  {
    avatar: "/users/user1.png",
    text: "You have a bug that needs...",
    time: "Just now",
  },
  {
    avatar: "/users/user2.png",
    text: "Released a new version",
    time: "59 minutes ago",
  },
  {
    avatar: "/users/user3.png",
    text: "Submitted a bug",
    time: "12 hours ago",
  },
  {
    avatar: "/users/user4.png",
    text: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "/users/user5.png",
    text: "Deleted a page in Project X",
    time: "Feb 2, 2023",
  },
];

const contacts = [
  { name: "Natali Craig", avatar: "/users/user6.png" },
  { name: "Drew Cano", avatar: "/users/user7.png" },
  { name: "Orlando Diggs", avatar: "/users/user8.png" },
  { name: "Andi Lane", avatar: "/users/user9.png" },
  { name: "Kate Morrison", avatar: "/users/user1.png" },
  { name: "Koray Okumus", avatar: "/users/user2.png" },
];

export function NotificationsSidebar() {
  const { isNotificationsOpen, toggleNotifications } = useSidebar();
  const { theme } = useTheme();
  const bgColors = colors.getBackground(theme);
  const textColors = colors.getText(theme);
  const borderColors = colors.getBorder(theme);

  const notifications = [
    {
      icon: "bug",
      text: "You have a bug that needs...",
      time: "Just now",
      bgColor:
        theme === "dark"
          ? colors.background.darkTertiary
          : colors.background.blue,
    },
    {
      icon: "user",
      text: "New user registered",
      time: "59 minutes ago",
      bgColor:
        theme === "dark"
          ? colors.background.darkSecondary
          : colors.background.tertiary,
    },
    {
      icon: "bug",
      text: "You have a bug that needs...",
      time: "12 hours ago",
      bgColor:
        theme === "dark"
          ? colors.background.darkTertiary
          : colors.background.blue,
    },
    {
      icon: "broadcast",
      text: "Andi Lane subscribed to you",
      time: "Today, 11:59 AM",
      bgColor:
        theme === "dark"
          ? colors.background.darkSecondary
          : colors.background.tertiary,
    },
  ];

  return (
    <>
      {isNotificationsOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40 lg:hidden"
          onClick={toggleNotifications}
        />
      )}
      <aside
        className={`${
          isNotificationsOpen ? "w-80 sm:w-72 lg:w-72" : "w-0 lg:w-0"
        } fixed lg:relative top-0 right-0 h-full border-l overflow-y-auto transition-all duration-300 overflow-hidden z-50 lg:z-auto`}
        style={{
          backgroundColor: bgColors.card,
          borderColor: borderColors.light,
        }}
      >
        <div className="p-4">
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: textColors.primary }}
          >
            Notifications
          </h2>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: notification.bgColor }}
                >
                  {notification.icon === "bug" && <BugIcon size={16} />}
                  {notification.icon === "user" && <UserIcon size={16} />}
                  {notification.icon === "broadcast" && (
                    <BroadcastIcon size={16} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm truncate"
                    style={{ color: textColors.primary }}
                  >
                    {notification.text}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: textColors.muted }}
                  >
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-4 border-t"
          style={{ borderColor: borderColors.light }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: textColors.primary }}
          >
            Activities
          </h2>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 relative">
                {index < activities.length - 1 && (
                  <div
                    className="absolute left-4 top-8 bottom-0 w-px -mb-3"
                    style={{ backgroundColor: borderColors.light }}
                  />
                )}
                <Avatar className="w-8 h-8 relative z-10">
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm truncate"
                    style={{ color: textColors.primary }}
                  >
                    {activity.text}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: textColors.muted }}
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-4 border-t"
          style={{ borderColor: borderColors.light }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: textColors.primary }}
          >
            Contacts
          </h2>
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm" style={{ color: textColors.primary }}>
                  {contact.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

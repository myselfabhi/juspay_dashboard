"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AddIcon,
  FilterIcon,
  ArrowDownIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/Icon";
import { MoreHorizontal, ChevronUp, ChevronDown, X } from "lucide-react";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";
import { responsiveClasses } from "@/lib/responsive-utils";

type Order = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
};

type SortField = "id" | "user" | "project" | "address" | "date" | "status";
type SortDirection = "asc" | "desc";

interface FilterState {
  status: string[];
  dateRange: {
    start: string;
    end: string;
  };
  user: string;
}

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

const orders: Order[] = [
  {
    id: "#CM9801",
    user: { name: "Natali Craig", avatar: "/users/user1.png" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
  },
  {
    id: "#CM9802",
    user: { name: "Kate Morrison", avatar: "/users/user2.png" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
  },
  {
    id: "#CM9803",
    user: { name: "Drew Cano", avatar: "/users/user3.png" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    id: "#CM9804",
    user: { name: "Orlando Diggs", avatar: "/users/user4.png" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
  },
  {
    id: "#CM9805",
    user: { name: "Andi Lane", avatar: "/users/user5.png" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
  },
  {
    id: "#CM9806",
    user: { name: "Sarah Johnson", avatar: "/users/user6.png" },
    project: "E-commerce Platform",
    address: "Main Street Boston",
    date: "2 hours ago",
    status: "In Progress",
  },
  {
    id: "#CM9807",
    user: { name: "Michael Chen", avatar: "/users/user7.png" },
    project: "Mobile App",
    address: "Tech Avenue Seattle",
    date: "3 hours ago",
    status: "Complete",
  },
  {
    id: "#CM9808",
    user: { name: "Emily Rodriguez", avatar: "/users/user8.png" },
    project: "Analytics Dashboard",
    address: "Data Drive Austin",
    date: "4 hours ago",
    status: "Pending",
  },
  {
    id: "#CM9809",
    user: { name: "David Kim", avatar: "/users/user9.png" },
    project: "API Integration",
    address: "Cloud Street Denver",
    date: "5 hours ago",
    status: "Approved",
  },
  {
    id: "#CM9810",
    user: { name: "Lisa Thompson", avatar: "/users/user1.png" },
    project: "UI/UX Design",
    address: "Creative Lane Portland",
    date: "6 hours ago",
    status: "Rejected",
  },
];

export default function OrderListPage() {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);
  const chartColors = colors.getChart(theme);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(
    new Set(["#CM9804"])
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: "asc",
  });
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    dateRange: { start: "", end: "" },
    user: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const statusConfig = {
    "In Progress": { color: chartColors.sponsored, dot: chartColors.sponsored },
    Complete: { color: chartColors.affiliate, dot: chartColors.affiliate },
    Pending: { color: chartColors.actual, dot: chartColors.actual },
    Approved: { color: "#FFC555", dot: "#FFC555" },
    Rejected: {
      color: theme === "dark" ? "#8A8A8A" : "#1c1c1c66",
      dot: theme === "dark" ? "#8A8A8A" : "#1c1c1c66",
    },
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      const searchMatch =
        searchQuery === "" ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.address.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch =
        filters.status.length === 0 || filters.status.includes(order.status);

      const userMatch =
        filters.user === "" ||
        order.user.name.toLowerCase().includes(filters.user.toLowerCase());

      return searchMatch && statusMatch && userMatch;
    });
    if (sortState.field) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortState.field) {
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          case "user":
            aValue = a.user.name;
            bValue = b.user.name;
            break;
          case "project":
            aValue = a.project;
            bValue = b.project;
            break;
          case "address":
            aValue = a.address;
            bValue = b.address;
            break;
          case "date":
            aValue = a.date;
            bValue = b.date;
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          default:
            return 0;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          return sortState.direction === "asc" ? comparison : -comparison;
        }

        return 0;
      });
    }

    return filtered;
  }, [orders, searchQuery, filters, sortState]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      resetPagination();
    },
    [resetPagination]
  );

  const handleSort = useCallback(
    (field: SortField) => {
      setSortState((prev) => ({
        field,
        direction:
          prev.field === field && prev.direction === "asc" ? "desc" : "asc",
      }));
      resetPagination();
    },
    [resetPagination]
  );

  const handleStatusFilter = useCallback(
    (status: string, checked: boolean) => {
      setFilters((prev) => ({
        ...prev,
        status: checked
          ? [...prev.status, status]
          : prev.status.filter((s) => s !== status),
      }));
      resetPagination();
    },
    [resetPagination]
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      status: [],
      dateRange: { start: "", end: "" },
      user: "",
    });
    setSearchQuery("");
    resetPagination();
  }, [resetPagination]);

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === paginatedOrders.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedOrders.map((o) => o.id)));
    }
  };

  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(orders.map((order) => order.status)));
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== "" ||
      filters.status.length > 0 ||
      filters.user !== "" ||
      filters.dateRange.start !== "" ||
      filters.dateRange.end !== ""
    );
  }, [searchQuery, filters]);

  return (
    <div
      className="min-h-screen pt-2 sm:pt-4 transition-colors"
      style={{ backgroundColor: bgColors.primary }}
    >
      <div className={responsiveClasses.container}>
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <h1
            className={`${responsiveClasses.text.heading} font-semibold`}
            style={{ color: textColors.primary }}
          >
            Order List
          </h1>
        </div>

        <div
          className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
          style={{ backgroundColor: theme === "dark" ? "#2D2D2D" : "#F7F9FB" }}
        >
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 border-none cursor-pointer shadow-none bg-transparent"
              style={{
                backgroundColor: "transparent",
                borderColor: borderColors.light,
                color: textColors.primary,
              }}
            >
              <AddIcon size={18} className="sm:w-5 sm:h-5" />
            </Button>

            <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-8 w-8 sm:h-9 sm:w-9 border-none cursor-pointer shadow-none transition-colors ${
                    hasActiveFilters ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    backgroundColor: hasActiveFilters
                      ? theme === "dark"
                        ? "#1E3A8A"
                        : "#EBF8FF"
                      : "transparent",
                    borderColor: borderColors.light,
                    color: textColors.primary,
                  }}
                >
                  <FilterIcon size={18} className="sm:w-5 sm:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-64"
                style={{
                  backgroundColor: theme === "dark" ? "#2D2D2D" : "#FFFFFF",
                  borderColor: theme === "dark" ? "#4A4A4A" : "#E5E7EB",
                }}
              >
                <div className="p-2">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-sm font-medium"
                      style={{ color: textColors.primary }}
                    >
                      Filters
                    </span>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-6 px-2 text-xs"
                        style={{ color: textColors.muted }}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        className="text-xs font-medium mb-2 block"
                        style={{ color: textColors.secondary }}
                      >
                        Status
                      </label>
                      <div className="space-y-1">
                        {uniqueStatuses.map((status) => (
                          <div
                            key={status}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={(checked) =>
                                handleStatusFilter(status, checked as boolean)
                              }
                              style={{
                                backgroundColor:
                                  theme === "dark" ? "#c6c7f8" : undefined,
                              }}
                              className={
                                theme === "dark"
                                  ? "[&>span]:text-[#1a1a1a]"
                                  : ""
                              }
                            />
                            <label
                              htmlFor={`status-${status}`}
                              className="text-xs cursor-pointer flex items-center gap-2"
                              style={{ color: textColors.primary }}
                            >
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    statusConfig[
                                      status as keyof typeof statusConfig
                                    ]?.dot,
                                }}
                              />
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        className="text-xs font-medium mb-2 block"
                        style={{ color: textColors.secondary }}
                      >
                        User
                      </label>
                      <Input
                        placeholder="Filter by user..."
                        value={filters.user}
                        onChange={(e) => {
                          setFilters((prev) => ({
                            ...prev,
                            user: e.target.value,
                          }));
                          resetPagination();
                        }}
                        className="h-8 text-xs"
                        style={{
                          borderColor:
                            theme === "dark" ? "#4A4A4A" : "#1A1A1A20",
                          backgroundColor:
                            theme === "dark" ? "#3A3A3A" : "#FFFFFF40",
                          color: textColors.primary,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9 border-none cursor-pointer shadow-none bg-transparent"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: borderColors.light,
                    color: textColors.primary,
                  }}
                >
                  <ArrowDownIcon size={18} className="sm:w-5 sm:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                style={{
                  backgroundColor: theme === "dark" ? "#2D2D2D" : "#FFFFFF",
                  borderColor: theme === "dark" ? "#4A4A4A" : "#E5E7EB",
                }}
              >
                <DropdownMenuItem
                  onClick={() => setPageSize(5)}
                  style={{ color: textColors.primary }}
                >
                  5 per page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setPageSize(10)}
                  style={{ color: textColors.primary }}
                >
                  10 per page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setPageSize(25)}
                  style={{ color: textColors.primary }}
                >
                  25 per page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setPageSize(50)}
                  style={{ color: textColors.primary }}
                >
                  50 per page
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8 pr-8 py-2 sm:py-3 rounded-[10px] outline-none shadow-none transition-colors text-sm sm:text-base"
              style={{
                borderColor: theme === "dark" ? "#4A4A4A" : "#1A1A1A20",
                backgroundColor: theme === "dark" ? "#3A3A3A" : "#FFFFFF40",
                color: textColors.primary,
              }}
            />
            <svg
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: theme === "dark" ? "#8A8A8A" : "#1c1c1c33" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: theme === "dark" ? "#8A8A8A" : "#1c1c1c33" }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[800px]">
            <thead
              className="border-b"
              style={{
                borderColor: theme === "dark" ? "#494949" : "#d2d2d2",
              }}
            >
              <tr>
                <th className="w-12 px-2 sm:px-4 py-3">
                  <Checkbox
                    checked={
                      selectedRows.size === paginatedOrders.length &&
                      paginatedOrders.length > 0
                    }
                    onCheckedChange={toggleAll}
                    style={{
                      backgroundColor: theme === "dark" ? "#c6c7f8" : undefined,
                    }}
                    className={
                      theme === "dark" ? "[&>span]:text-[#1a1a1a]" : ""
                    }
                  />
                </th>
                <th
                  className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === "dark" ? "#494949" : "#1C1C1C66",
                    backgroundColor:
                      sortState.field === "id"
                        ? theme === "dark"
                          ? "#3A3A3A"
                          : "#F3F4F6"
                        : "transparent",
                  }}
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    Order ID
                    {sortState.field === "id" &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === "dark" ? "#494949" : "#1C1C1C66",
                    backgroundColor:
                      sortState.field === "user"
                        ? theme === "dark"
                          ? "#3A3A3A"
                          : "#F3F4F6"
                        : "transparent",
                  }}
                  onClick={() => handleSort("user")}
                >
                  <div className="flex items-center gap-1">
                    User
                    {sortState.field === "user" &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium hidden sm:table-cell cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === "dark" ? "#494949" : "#1C1C1C66",
                    backgroundColor:
                      sortState.field === "project"
                        ? theme === "dark"
                          ? "#3A3A3A"
                          : "#F3F4F6"
                        : "transparent",
                  }}
                  onClick={() => handleSort("project")}
                >
                  <div className="flex items-center gap-1">
                    Project
                    {sortState.field === "project" &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium hidden md:table-cell cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === "dark" ? "#494949" : "#1C1C1C66",
                    backgroundColor:
                      sortState.field === "address"
                        ? theme === "dark"
                          ? "#3A3A3A"
                          : "#F3F4F6"
                        : "transparent",
                  }}
                  onClick={() => handleSort("address")}
                >
                  <div className="flex items-center gap-1">
                    Address
                    {sortState.field === "address" &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === "dark" ? "#494949" : "#1C1C1C66",
                    backgroundColor:
                      sortState.field === "date"
                        ? theme === "dark"
                          ? "#3A3A3A"
                          : "#F3F4F6"
                        : "transparent",
                  }}
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortState.field === "date" &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{
                    color: theme === "dark" ? "#494949" : "#1C1C1C66",
                    backgroundColor:
                      sortState.field === "status"
                        ? theme === "dark"
                          ? "#3A3A3A"
                          : "#F3F4F6"
                        : "transparent",
                  }}
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortState.field === "status" &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </th>
                <th className="w-12 px-2 sm:px-4 py-3"></th>
              </tr>
            </thead>
            <tbody
              style={{
                borderColor: theme === "dark" ? "#333333" : "#f4f4f4",
              }}
            >
              {paginatedOrders.map((order, index) => (
                <tr
                  key={`${order.id}-${index}`}
                  className="transition-all"
                  style={{
                    backgroundColor:
                      hoveredRow === order.id
                        ? theme === "dark"
                          ? "#272727"
                          : "#f6f9fb"
                        : "transparent",
                    borderRadius: hoveredRow === order.id ? "0.75rem" : "0",
                    borderBottom: `1px solid ${
                      theme === "dark" ? "#333333" : "#f4f4f4"
                    }`,
                  }}
                  onMouseEnter={() => setHoveredRow(order.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-2 sm:px-4 py-3 sm:py-4 cursor-pointer">
                    <Checkbox
                      checked={selectedRows.has(order.id)}
                      onCheckedChange={() => toggleRow(order.id)}
                      style={{
                        opacity:
                          selectedRows.has(order.id) || hoveredRow === order.id
                            ? 1
                            : 0,
                        transition: "opacity 0.2s ease-in-out",
                        backgroundColor:
                          theme === "dark" ? "#c6c7f8" : undefined,
                      }}
                      className={
                        theme === "dark" ? "[&>span]:text-[#1a1a1a]" : ""
                      }
                    />
                  </td>
                  <td
                    className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium"
                    style={{ color: textColors.primary }}
                  >
                    {order.id}
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarImage
                          src={order.user.avatar || "/placeholder.svg"}
                          alt={order.user.name}
                        />
                        <AvatarFallback className="text-xs">
                          {order.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none"
                        style={{ color: textColors.primary }}
                      >
                        {order.user.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm hidden sm:table-cell"
                    style={{ color: textColors.primary }}
                  >
                    <span className="truncate block max-w-[120px]">
                      {order.project}
                    </span>
                  </td>
                  <td
                    className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm hidden md:table-cell"
                    style={{ color: textColors.primary }}
                  >
                    <span className="truncate block max-w-[150px]">
                      {order.address}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4">
                    <div
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                      style={{ color: textColors.primary }}
                    >
                      <CalendarIcon size={14} className="sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[60px] sm:max-w-none">
                        {order.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div
                        className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
                        style={{
                          backgroundColor: statusConfig[order.status].dot,
                        }}
                      />
                      <span
                        className="text-xs sm:text-sm truncate max-w-[60px] sm:max-w-none"
                        style={{ color: statusConfig[order.status].color }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 sm:h-8 sm:w-8"
                          style={{
                            opacity:
                              selectedRows.has(order.id) ||
                              hoveredRow === order.id
                                ? 1
                                : 0,
                            transition: "opacity 0.2s ease-in-out",
                            backgroundColor: "transparent",
                            color: textColors.primary,
                          }}
                        >
                          <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#2D2D2D" : "#FFFFFF",
                          borderColor: theme === "dark" ? "#4A4A4A" : "#E5E7EB",
                        }}
                      >
                        <DropdownMenuItem style={{ color: textColors.primary }}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem style={{ color: textColors.primary }}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem style={{ color: "#DC2626" }}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            className="text-xs sm:text-sm"
            style={{ color: textColors.muted }}
          >
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredAndSortedOrders.length)} of{" "}
            {filteredAndSortedOrders.length} orders
            {hasActiveFilters && (
              <span className="ml-2">
                (filtered from {orders.length} total)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 shadow-none border-none cursor-pointer rounded-md bg-transparent"
              style={{
                backgroundColor: "transparent",
                borderColor: borderColors.light,
                color: textColors.primary,
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = bgColors.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon size={14} className="sm:w-4 sm:h-4" />
            </Button>

            <div className="hidden sm:flex items-center gap-1 sm:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 cursor-pointer border-none shadow-none transition-colors rounded-lg bg-transparent"
                    style={{
                      backgroundColor:
                        currentPage === pageNum
                          ? theme === "dark"
                            ? "#4A4A4A"
                            : "#f4f4f4"
                          : "transparent",
                      borderColor: borderColors.light,
                      color: textColors.primary,
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== pageNum) {
                        e.currentTarget.style.backgroundColor =
                          theme === "dark" ? "#4A4A4A" : "#f4f4f4";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== pageNum) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    <span className="text-xs sm:text-sm">{pageNum}</span>
                  </Button>
                );
              })}
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <span
                className="text-xs px-2 py-1 rounded"
                style={{
                  color: textColors.primary,
                  backgroundColor: theme === "dark" ? "#4A4A4A" : "#f4f4f4",
                }}
              >
                {currentPage} / {totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-md shadow-none border-none cursor-pointer transition-colors bg-transparent"
              style={{
                backgroundColor: "transparent",
                borderColor: borderColors.light,
                color: textColors.primary,
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = bgColors.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ArrowRightIcon size={14} className="sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

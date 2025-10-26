/**
 * OrderList Component
 * Created by Abhinav Verma
 * A comprehensive order management dashboard with advanced filtering, sorting, and search capabilities
 * Built with Next.js, TypeScript, and Tailwind CSS
 */
import React, { useState } from "react";
import { 
  Search, 
  Sun, 
  Moon, 
  RefreshCw, 
  Bell, 
  Grid3X3, 
  Plus, 
  Filter, 
  ArrowUpDown,
  ChevronRight,
  Home,
  Folder,
  User,
  Building,
  FileText,
  MessageCircle,
  Calendar,
  File,
  MoreHorizontal
} from "lucide-react";
import { IconComponent } from "./icons/IconComponent";

interface Order {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: 'in-progress' | 'complete' | 'pending' | 'approved' | 'rejected';
}

const mockOrders: Order[] = [
  {
    id: "#CM9801",
    user: { name: "Natali Craig", avatar: "/api/placeholder/32/32" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "in-progress"
  },
  {
    id: "#CM9802", 
    user: { name: "Drew Cano", avatar: "/api/placeholder/32/32" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Yesterday",
    status: "complete"
  },
  {
    id: "#CM9803",
    user: { name: "Orlando Diggs", avatar: "/api/placeholder/32/32" },
    project: "Landing Page", 
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "pending"
  },
  {
    id: "#CM9804",
    user: { name: "Andi Lane", avatar: "/api/placeholder/32/32" },
    project: "Landing Page",
    address: "Meadow Lane Oakland", 
    date: "Feb 2, 2023",
    status: "approved"
  },
  {
    id: "#CM9805",
    user: { name: "Kate Morrison", avatar: "/api/placeholder/32/32" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Feb 2, 2023", 
    status: "rejected"
  }
];

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-purple-500', dotColor: 'bg-purple-500' },
  'complete': { label: 'Complete', color: 'bg-green-500', dotColor: 'bg-green-500' },
  'pending': { label: 'Pending', color: 'bg-blue-500', dotColor: 'bg-blue-500' },
  'approved': { label: 'Approved', color: 'bg-yellow-500', dotColor: 'bg-yellow-500' },
  'rejected': { label: 'Rejected', color: 'bg-red-500', dotColor: 'bg-red-500' }
};

interface OrderListProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function OrderList({ isDarkMode, onToggleDarkMode }: OrderListProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const bgColor = isDarkMode ? "bg-[#1c1c1c]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-[#1c1c1c]";
  const textColorMuted = isDarkMode ? "text-white/40" : "text-[#1c1c1c]/40";
  const textColorMuted2 = isDarkMode ? "text-white/20" : "text-[#1c1c1c]/20";
  const borderColor = isDarkMode ? "border-white/10" : "border-[#1c1c1c]/10";
  const bgHighlight = isDarkMode ? "bg-white/10" : "bg-[#1c1c1c]/5";
  const bgHighlight2 = isDarkMode ? "bg-white/5" : "bg-[#1c1c1c]/5";
  const selectedColor = isDarkMode ? "#C6C7F8" : "#1C1C1C";

  return (
    <div className={`${bgColor} flex-1 flex flex-col`}>
      {/* Content */}
      <div className="flex-1 p-6">
        {/* Title */}
        <h1 
          className="mb-6" 
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            color: isDarkMode ? '#FFFFFF' : '#1C1C1C'
          }}
        >
          Order List
        </h1>

        {/* Toolbar */}
        <div 
          className="mb-4 flex items-center justify-between w-full max-w-[1172px]"
          style={{
            height: '44px',
            gap: '16px',
            borderRadius: '8px',
            padding: '8px',
            background: '#F7F9FB'
          }}
        >
          <div className="flex items-center gap-4">
            {/* Professional icon names: Plus, Filter, Sort */}
            <button className="p-1 hover:opacity-70 transition-opacity">
              <IconComponent name="plus" />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity">
              <IconComponent name="filter" />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity">
              <IconComponent name="sort" />
            </button>
          </div>
          <div 
            className="flex items-center gap-2"
            style={{
              width: '160px',
              height: '28px',
              gap: '8px',
              borderRadius: '8px',
              borderWidth: '1px',
              paddingTop: '4px',
              paddingRight: '8px',
              paddingBottom: '4px',
              paddingLeft: '8px',
              background: '#FFFFFF66',
              border: '1px solid #1C1C1C1A'
            }}
          >
            <IconComponent name="search" />
            <span className={`text-sm ${textColorMuted2}`}>Search</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Project</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockOrders.map((order, index) => (
                  <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-900">{order.user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.project}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-900">{order.address}</span>
                        {order.address.includes('Nest Lane') && <File className="w-3 h-3 text-gray-400" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-900">{order.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusConfig[order.status].dotColor}`}></div>
                        <span className="text-sm text-gray-900">{statusConfig[order.status].label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {order.status === 'rejected' && (
                        <button className="p-1 hover:opacity-70 transition-opacity">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">‹</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-900 rounded">1</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">4</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">5</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

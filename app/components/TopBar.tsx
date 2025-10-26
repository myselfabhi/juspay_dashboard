import { Search, Star, LayoutGrid, Sun, Moon, Clock, Bell, LayoutPanelLeft } from 'lucide-react';

interface TopBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentView: 'ecommerce' | 'orderlist';
}

export function TopBar({ isDarkMode, onToggleDarkMode, currentView }: TopBarProps) {
  return (
    <div className={`h-14 border-b ${isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} flex items-center justify-between px-6`}>
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button className={`p-1.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
          <LayoutPanelLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
        <button className={`p-1.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
          <Star className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
        <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Dashboards</span>
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {currentView === 'ecommerce' ? 'eCommerce' : 'Order List'}
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className={`pl-9 pr-12 py-1.5 ${isDarkMode ? 'bg-[#0a0a0a] text-white placeholder:text-gray-500' : 'bg-gray-100'} rounded text-sm w-[240px] focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-gray-600' : 'focus:ring-gray-300'}`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">⌘/</span>
        </div>
        <button 
          onClick={onToggleDarkMode}
          className={`p-1.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}
        >
          {isDarkMode ? (
            <Moon className="w-5 h-5 text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <button className={`p-1.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
          <Clock className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
        <button className={`p-1.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
          <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
        <button className={`p-1.5 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
          <LayoutGrid className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
      </div>
    </div>
  );
}

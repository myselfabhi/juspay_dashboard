import { Star, LayoutGrid, FileText, BarChart3, ShoppingCart, FolderKanban, GraduationCap, User, ChevronRight, List } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  onNavigate: (view: 'ecommerce' | 'orderlist') => void;
  currentView: 'ecommerce' | 'orderlist';
}

export function Sidebar({ isDarkMode, onNavigate, currentView }: SidebarProps) {
  return (
    <div className={`w-[240px] border-r ${isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} h-screen flex flex-col`}>
      {/* Logo */}
      <div className={`p-4 flex items-center gap-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`w-6 h-6 ${isDarkMode ? 'bg-white' : 'bg-black'} rounded-sm`}></div>
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ByeWind</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* Favorites Section */}
        <div className="mb-6">
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} px-3 mb-2`}>Favorites</div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} px-3 mb-2`}>Recently</div>
        </div>

        {/* Dashboards Section */}
        <div className="mb-6">
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} px-3 mb-2`}>Dashboards</div>
          <nav className="space-y-1">
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <LayoutGrid className="w-4 h-4" />
              <span>Default</span>
            </a>
            <button 
              onClick={() => onNavigate('ecommerce')}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm w-full text-left ${currentView === 'ecommerce' ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')} rounded`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>eCommerce</span>
            </button>
            <button 
              onClick={() => onNavigate('orderlist')}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm w-full text-left ${currentView === 'orderlist' ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')} rounded`}
            >
              <List className="w-4 h-4" />
              <span>Order List</span>
            </button>
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <FolderKanban className="w-4 h-4" />
              <span>Projects</span>
            </a>
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <GraduationCap className="w-4 h-4" />
              <span>Online Courses</span>
            </a>
          </nav>
        </div>

        {/* Pages Section */}
        <div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} px-3 mb-2`}>Pages</div>
          <nav className="space-y-1">
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <User className="w-4 h-4" />
              <span>User Profile</span>
            </a>
            <div className={`px-3 py-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <div className="pl-6 space-y-1">
                <a href="#" className={`block py-1 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Overview</a>
                <a href="#" className={`block py-1 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Projects</a>
                <a href="#" className={`block py-1 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Campaigns</a>
                <a href="#" className={`block py-1 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Documents</a>
                <a href="#" className={`block py-1 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Followers</a>
              </div>
            </div>
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <BarChart3 className="w-4 h-4" />
              <span>Account</span>
            </a>
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <BarChart3 className="w-4 h-4" />
              <span>Corporate</span>
            </a>
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <FileText className="w-4 h-4" />
              <span>Blog</span>
            </a>
            <a href="#" className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded`}>
              <BarChart3 className="w-4 h-4" />
              <span>Social</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Search, 
  Mail, 
  Bell,
  LogOut
} from 'lucide-react';
import Logo from '../assets/images/logo.png'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <img src={Logo} alt=''/>
          </div>
          <span className="text-xl font-bold text-gray-800">TrafficStat</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search collisions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 ml-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Jason Ranti"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">Jason Ranti</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
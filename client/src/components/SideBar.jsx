import React from "react";
import {
  Users,
  Home,
  Settings,
  ChartColumnDecreasing,
  TrafficCone,
  Files,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", icon: Home, label: "Dashboard" },
    { id: "collisions", icon: TrafficCone, label: "Collisions" },
    { id: "analytics", icon: ChartColumnDecreasing, label: "Analytics" },
    { id: "users", icon: Users, label: "Users" },
  ];

  const currentPath = location.pathname.split("/")[1]; // Get path after the first slash

  const friends = [
    {
      name: "Bagas Mahpie",
      status: "Admin",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    {
      name: "Sir Dandy",
      status: "Admin",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    },
    {
      name: "Jhon Tosan",
      status: "Admin",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Overview Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            OVERVIEW
          </h3>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    navigate(`/${item.id}`);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Friends Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            ADMINS
          </h3>
          <div className="space-y-3">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {friend.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            SETTINGS
          </h3>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

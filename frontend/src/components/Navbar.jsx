import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  FaSun,
  FaMoon,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBell,
} from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState("Dark");
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const themes = [
    { name: "Dark", icon: <FaMoon /> },
    { name: "Light", icon: <FaSun /> },
  ];

  return (
    <nav className="fixed w-full top-0 border-b-1 p-4 flex items-center justify-between bg-white ">
      {/* Left: Sidebar Toggle Button */}
      <button
        className="md:hidden p-2 bg-blue-500 rounded cursor-pointer"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>

      {/* Center: Logo/Tagline */}
      <div
        className={`flex-1 ml-20 md:ml-64 text-center md:text-left transition-all duration-300`}
        onClick={() => (window.location.href = "/")}
      >
        <span className="text-sm font-medium text-gray-600 cursor-pointer">
          Your Compliance Partner
        </span>
      </div>

      {/* Right: Search, Theme, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <FaSearch className="absolute top-2 right-2 text-gray-500" />
        </div>

        {/* Theme Toggle */}
        <div className="relative cursor-pointer">
          {open && (
            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded border w-28">
              {themes.map((t) => (
                <li
                  key={t.name}
                  className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setTheme(t.name);
                    setOpen(false);
                  }}
                >
                  {t.icon} <span className="ml-2">{t.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell
            className="text-2xl text-gray-700"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          />
          {notificationsOpen && (
            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded border w-48">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                No new notifications
              </li>
            </ul>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative cursor-pointer">
          <FaUserCircle
            className="text-2xl text-gray-700"
            onClick={() => setProfileOpen(!profileOpen)}
          />
          {profileOpen && (
            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded border w-32">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Settings</li>
              <li className="p-2 hover:bg-red-500 text-red-700 hover:text-white cursor-pointer">
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

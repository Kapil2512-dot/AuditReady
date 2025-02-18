import React from "react";
import { FaSun } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="  flex-1 p-4 flex items-center justify-between ">
      {/* Left: Logo and Cheveron */}
      <div className="flex items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-transparent bg-clip-text">
          AuditReady
        </div>
        {/* Replace with your logo component or image */}
        <span className="text-white">&laquo;</span> {/* Cheveron character */}
      </div>

      {/* Right: Theme and Icons */}
      <div className="flex items-center space-x-4">
        <FaSun />

        <select className="font-bold" value="Theme">
          <option value="Dark">Dark</option>
          <option value="Light">Light</option>
        </select>

        {/* Theme text */}
        {/* Icons */}
        <div className="flex items-center space-x-2">
          {" "}
          {/* Container for icons */}
          <a href="#" className="text-white hover:text-gray-300">
            {/* Bell Icon - Replace with your SVG or icon component */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Add your SVG path here - this is a placeholder */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.657V5a2 2 0 10-4 0v.343C7.67 6.165 6 8.388 6 11v3.158c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </a>
          <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

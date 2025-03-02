import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaSignOutAlt,
  FaBook,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="fixed inset-0 h-screen z-50 shadow-lg bg-opacity-90 backdrop-blur-lg w-64 bg-black text-white flex flex-col transition-all duration-300  p-2"
    >
      <div
        onClick={() => (window.location.href = "/")}
        className="p-4 text-3xl mb-5 font-bold cursor-pointer text-center bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-transparent bg-clip-text"
      >
        AuditReady
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-2 cursor-pointer">
          {[
            { path: "/", label: "Home", icon: <FaHome /> },
            { path: "/clients", label: "Client", icon: <FaUser /> },
            { path: "/program", label: "Program", icon: <FaProjectDiagram /> },
            { path: "/policies", label: "Policies", icon: <FaBook /> },
            { path: "/evidence", label: "Evidence", icon: <FaClipboardList /> },
            { path: "/login", label: "Login", icon: <FaClipboardList /> },
          ].map((item) => (
            <li
              key={item.path}
              className={`flex items-center space-x-3 p-2 cursor-pointer rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-sky-600"
                  : "hover:bg-gray-800"
              }`}
            >
              <Link
                to={item.path}
                className="flex items-center space-x-3 w-full"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center space-x-2 w-full p-2 hover:bg-red-700 rounded-lg transition-all duration-300">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

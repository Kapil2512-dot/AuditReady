import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCogs,
  FaSignOutAlt,
  FaBook,
  FaClipboardList,
  FaMapSigns,
} from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null); // Reference to the sidebar

  // Check screen width and set isMobile based on it
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust based on your mobile breakpoint
    };

    handleResize(); // Check on initial load

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle toggle on mobile
  const toggleSidebar = () => {
    if (isMobile) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-0 h-screen z-50 ${
        isExpanded ? "w-64" : "w-18"
      } bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-white flex flex-col transition-all duration-300`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)} // Expand on hover for desktop
      onMouseLeave={() => !isMobile && setIsExpanded(false)} // Collapse on hover for desktop
      onClick={toggleSidebar} // Toggle on click for mobile only
    >
      {/* Logo */}
      <div className="p-5 text-3xl font-bold cursor-pointer text-center">
        {isExpanded ? "AuditReady" : "A"}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2 cursor-pointer">
          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <Link to="/" className="flex items-center space-x-3">
              <FaHome />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <Link to="/clients" className="flex items-center space-x-3">
              <FaUser />
              {isExpanded && <span>Client</span>}
            </Link>
          </li>

          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <Link to="/program" className="flex items-center space-x-3">
              <FaProjectDiagram />
              {isExpanded && <span>Program</span>}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <Link to="/policies" className="flex items-center space-x-3">
              <FaBook />
              {isExpanded && <span>Policies</span>}
            </Link>
          </li>

          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <Link to="/Evidence" className="flex items-center space-x-3">
              <FaClipboardList />
              {isExpanded && <span>Evidence</span>}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <Link to="/login" className="flex items-center space-x-3">
              <FaClipboardList />
              {isExpanded && <span>Login</span>}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <FaCogs />
            {isExpanded && (
              <div className="w-full ml-0">
                <select
                  name=""
                  id=""
                  className={`${
                    isExpanded
                      ? "border-none mt-0 border-gray-300 rounded"
                      : "border-none"
                  } bg-transparent text-white cursor-pointer p-2 w-full focus:outline-none focus:ring-0 hover:bg-transparent`}
                >
                  <option
                    value="Risk (Beta)"
                    className={`${
                      !isExpanded
                        ? "bg-transparent ml-0 text-white"
                        : "text-black"
                    }`}
                  >
                    Risk (Beta)
                  </option>
                  <option
                    value="Vendors"
                    className={`${
                      !isExpanded ? "bg-transparent text-white" : "text-black"
                    }`}
                  >
                    Vendors
                  </option>
                  <option
                    value="Questionnaires"
                    className={`${
                      !isExpanded ? "bg-transparent text-white" : "text-black"
                    }`}
                  >
                    Questionnaires
                  </option>
                  <option
                    value="Assessments"
                    className={`${
                      !isExpanded ? "bg-transparent text-white" : "text-black"
                    }`}
                  >
                    Assessments
                  </option>
                </select>
              </div>
            )}
          </li>
          <li className="flex items-center space-x-3 p-2 cursor-pointer hover:transparent rounded">
            <FaMapSigns />
            {isExpanded && (
              <div className="w-full mt-0">
                <select
                  name=""
                  id=""
                  className={`${
                    isExpanded
                      ? "border-none border-gray-300 rounded"
                      : "border-none"
                  } bg-transparent text-white cursor-pointer p-2 w-full focus:outline-none focus:ring-0 hover:bg-transparent`}
                >
                  <option
                    value="More"
                    className={`${
                      !isExpanded
                        ? "bg-transparent ml-0 text-white"
                        : "text-black"
                    }`}
                  >
                    More
                  </option>
                  <option
                    value="Tenant Users"
                    className={`${
                      !isExpanded ? "bg-transparent text-white" : "text-black"
                    }`}
                  >
                    Tenant Users
                  </option>
                  <option
                    value="Help"
                    className={`${
                      !isExpanded ? "bg-transparent text-white" : "text-black"
                    }`}
                  >
                    Help
                  </option>
                </select>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center space-x-2 w-full p-2 hover:bg-red-700 rounded">
          <FaSignOutAlt />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

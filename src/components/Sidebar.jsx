import React, { useState } from "react";
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

  return (
    <div
      className={`h-screen ${
        isExpanded ? "w-64" : "w-18"
      } bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-white flex flex-col transition-all duration-300`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="p-5 text-3xl font-bold   cursor-pointer  text-center">
        {isExpanded ? "A" : "A"}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2  cursor-pointer">
          <li>
            <select
              name=""
              id=""
              className={`${
                isExpanded ? "border border-gray-300  rounded" : "border-none"
              } bg-transparent text-white  cursor-pointer p-2 text-lg w-full focus:outline-none focus:ring-0 hover:bg-transparent`}
            >
              <option
                value=""
                className={`${
                  !isExpanded ? "bg-transparent text-white" : "text-black"
                }`}
              ></option>
              <option
                value=""
                className={`${
                  !isExpanded ? "bg-transparent text-white" : "text-black"
                }`}
              ></option>
              <option
                value=""
                className={`${
                  !isExpanded ? "bg-transparent text-white" : "text-black"
                }`}
              ></option>
              <option
                value=""
                className={`${
                  !isExpanded ? "bg-transparent text-white" : "text-black"
                }`}
              ></option>
              <option
                value=""
                className={`${
                  !isExpanded ? "bg-transparent text-white" : "text-black"
                }`}
              ></option>
            </select>
          </li>

          <li className="flex items-center space-x-3 p-2  cursor-pointer hover:transparent rounded">
            <FaHome />
            {isExpanded && <span>Home</span>}
          </li>
          <li className="flex items-center space-x-3 p-2   cursor-pointer hover:transparent rounded">
            <FaUser />
            {isExpanded && <span>Tenants</span>}
          </li>
          <li className="flex items-center space-x-3 p-2  cursor-pointer hover:transparent rounded">
            <FaProjectDiagram />
            {isExpanded && <span>Projects</span>}
          </li>
          <li className="flex items-center space-x-3 p-2  cursor-pointer hover:transparent rounded">
            <FaBook />
            {isExpanded && <span>Policies</span>}
          </li>
          <li className="flex items-center space-x-3 p-2  cursor-pointer hover:transparent rounded">
            <FaClipboardList />
            {isExpanded && <span>Evidence</span>}
          </li>
          <li className="flex items-center space-x-3 p-2   cursor-pointer hover:transparent rounded">
            <FaCogs />
            {isExpanded && (
              <div className="w-full ml-0">
                <select
                  name=""
                  id=""
                  className={`${
                    isExpanded
                      ? "border-none  mt-0 border-gray-300 rounded"
                      : "border-none"
                  } bg-transparent text-white  cursor-pointer p-2   w-full focus:outline-none focus:ring-0 hover:bg-transparent`}
                >
                  <option
                    value=" Risk(Beta)"
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
          <li className="flex items-center space-x-3 p-2   cursor-pointer hover:transparent rounded">
            <FaMapSigns />
            {isExpanded && (
              <div className="w-full mt-0">
                <select
                  name=""
                  id=""
                  className={`${
                    isExpanded
                      ? "border-none  border-gray-300 rounded"
                      : "border-none"
                  } bg-transparent text-white  cursor-pointer p-2   w-full focus:outline-none focus:ring-0 hover:bg-transparent`}
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

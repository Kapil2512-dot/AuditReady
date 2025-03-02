import React from "react";
import {
  FaBuilding,
  FaProjectDiagram,
  FaCog,
  FaBook,
  FaUsers,
  FaListAlt,
  FaCogs,
  FaPlus,
  FaFolderPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const buttonsData = [
    { label: "Create Client", icon: <FaFolderPlus />, path: "/clients" },
    { label: "View Program", icon: <FaFolderPlus />, path: "/program" },
    { label: "View Controls", icon: <FaFolderPlus />, path: "/clients" },
    { label: "View Policies", icon: <FaFolderPlus />, path: "/policies" },
  ];

  const quickAccessItems = [
    { label: "Client", icon: <FaBuilding /> },
    { label: "Program", icon: <FaProjectDiagram /> },
    { label: "Controls", icon: <FaCog /> },
    { label: "Policies", icon: <FaBook /> },
    { label: "Client Users", icon: <FaUsers /> },
    { label: "Questionnaires", icon: <FaListAlt /> },
    { label: "Settings", icon: <FaCogs /> },
    { label: "Frameworks", icon: <FaPlus /> },
  ];

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 min-h-screen p-6 bg-white  pl-20 md:pl-64 pt-20 md:pt-24 transition-all duration-300">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold text-gray-900">Welcome</h1>
          <p className="mt-4 text-gray-700 text-lg">
            AuditReady is a governance risk and compliance platform.{" "}
            <a
              href="https://github.com/Kapil2512-dot/AuditReady"
              className="text-blue-700 underline hover:text-blue-900"
              rel="noopener noreferrer"
            >
              Please check here
            </a>{" "}
            for more information and/or questions.
          </p>

          {/* Button Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {buttonsData.map((button, index) => (
              <button
                key={index}
                onClick={() => navigate(button.path)}
                className="bg-white shadow-md rounded-lg px-6 py-4 flex items-center justify-center gap-2 text-gray-800 text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                aria-label={button.label}
              >
                {button.icon}
                {button.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-12 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition transform duration-300"
              >
                <div className="text-4xl text-blue-500 mb-3">{item.icon}</div>
                <div className="text-lg font-medium text-gray-800">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

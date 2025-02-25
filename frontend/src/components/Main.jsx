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
import { Navigate, useNavigate } from "react-router-dom";

const Main = () => {
  const buttonsData = [
    { label: "Create Client", icon: <FaFolderPlus />, path: "/clients" },
    { label: "View Program", icon: <FaFolderPlus />, path: "/program" },
    { label: "View Controls", icon: <FaFolderPlus />, path: "/clients" },
    { label: "View Policies", icon: <FaFolderPlus />, path: "/policies" },
  ];
  const Navigate = useNavigate();

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
    <div className="flex-1 h-screen p-4 ml-15 ">
      <div className="mt-20 ml-4 md:ml-8">
        <h1 className="text-4xl sm:text-3xl lg:text-4xl font-bold">Welcome</h1>
        <p className="mt-4 sm:mt-6 font-semibold text-xs sm:text-sm md:text-base">
          AuditReady is a governance risk and compliance platform.{" "}
          <a
            href="https://github.com/Kapil2512-dot/AuditReady"
            className="text-blue-500 underline hover:text-blue-700"
            rel="noopener noreferrer"
          >
            Please check here
          </a>{" "}
          for more information and/or questions.
        </p>

        {/* Responsive Buttons */}
        <div className="flex flex-wrap  justify-center gap-3 mt-6">
          {buttonsData.map((button, index) => (
            <button
              key={index}
              onClick={() => Navigate(button.path)}
              className="bg-white border border-gray-300 rounded-md px-3 sm:px-4 md:px-6 py-2 inline-flex items-center shadow-sm cursor-pointer 
                        hover:bg-blue-200 focus:outline-none text-xs sm:text-sm md:text-base transition-all duration-300"
              aria-label={button.label} // Added aria-label for accessibility
            >
              <span className="mr-2 text-base sm:text-lg">{button.icon}</span>
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 ml-4 md:ml-8">
        <div className="text-2xl font-bold mb-4">Quick Access</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer rounded-md shadow p-5 flex items-center justify-left hover:bg-gray-50 transition duration-300 max-w-sm w-full h-24"
            >
              <div className="mr-3 text-3xl">{item.icon}</div>{" "}
              {/* Increased icon size */}
              <div>
                <div className="font-semibold">{item.label}</div>{" "}
                {/* Increased font size */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;

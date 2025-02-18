import React from "react";
import { FiFolderPlus } from "react-icons/fi";

const Main = () => {
  const buttonsData = [
    { label: "Create Tenant", icon: <FiFolderPlus /> },
    { label: "View Projects", icon: <FiFolderPlus /> },
    { label: "View Controls", icon: <FiFolderPlus /> },
    { label: "View Policies", icon: <FiFolderPlus /> },
  ];
  return (
    <div className="flex-1 h-screen mt-0 p-4 bg-gray-100">
      <div className="mt-30 ml-15">
        <h1 className="text-5xl font-bold">Welcome</h1>
        <p className="mt-6 font-semibold">
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
        <div className="flex space-x-4">
          {/* Container for buttons */}
          {buttonsData.map((button, index) => (
            <button
              key={index}
              className="bg-white border mt-15 border-gray-300 rounded-md px-4 py-2 inline-flex items-center shadow-sm cursor-pointer hover:bg-blue-200 focus:outline-none w-auto max-w-max"
            >
              <span className="mr-2">{button.icon}</span> {/* Icon */}
              <span>{button.label}</span> {/* Label */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;

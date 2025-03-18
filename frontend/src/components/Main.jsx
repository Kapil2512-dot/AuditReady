import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaBook,
  FaPlus,
} from "react-icons/fa";

const Main = () => {
  const navigate = useNavigate();

  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Clear the username on logout
    navigate("/login");
  };

  // Key metrics or highlights
  const metrics = [
    {
      label: "Total Clients",
      value: "12",
      icon: <FaUsers className="text-3xl text-blue-500" />,
    },
    {
      label: "Active Programs",
      value: "5",
      icon: <FaClipboardList className="text-3xl text-green-500" />,
    },
    {
      label: "Pending Tasks",
      value: "3",
      icon: <FaCog className="text-3xl text-yellow-500" />,
    },
    {
      label: "Completed Policies",
      value: "8",
      icon: <FaBook className="text-3xl text-purple-500" />,
    },
  ];

  // Quick actions
  const quickActions = [
    {
      label: "Create New Client",
      icon: <FaPlus className="text-2xl" />,
      path: "/clients",
    },
    {
      label: "Generate Report",
      icon: <FaChartLine className="text-2xl" />,
      path: "/reports",
    },
  ];

  return (
    <div className="flex-1 min-h-screen p-4 md:p-6 bg-gray-50 pl-4 md:pl-20 lg:pl-64 pt-16 md:pt-20 lg:pt-24 transition-all duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Logout Button */}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome , {name}!
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                </div>
                <div>{metric.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-500">{action.icon}</div>
                  <p className="text-lg font-semibold text-gray-800">
                    {action.label}
                  </p>
                </div>
                <div className="text-gray-400">{">"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity (Placeholder) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

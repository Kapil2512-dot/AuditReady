import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {" "}
      {/* Font-sans for a clean look */}
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full">
        <div className="p-6">
          <div className="text-2xl font-bold mb-4">Gapps</div> {/* Logo area */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-700 rounded-md py-2 px-3 mb-6 focus:outline-none"
          />
          {/* Navigation Links */}
          <nav>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Home
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Tenants
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Projects
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Controls
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Policies
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Evidence
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Questionnaire
            </a>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              More
            </a>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          {" "}
          {/* Logout */}
          <a href="#" className="flex items-center">
            <span className="ml-2">LOGOUT</span>
          </a>
        </div>
      </aside>
      {/* Main Content Area */}
      <main className="ml-64 p-8">
        {" "}
        {/* Adjust margin-left to match sidebar width */}
        <div className="flex justify-between items-center mb-4">
          {" "}
          {/* Header */}
          <div>
            <span className="text-xl font-bold">Welcome</span>
          </div>
          <div>
            {" "}
            {/* Theme and User Info */}
            <button className="mr-4">Theme</button>{" "}
            {/* Replace with your theme logic */}
            {/* Add user icon/info here */}
          </div>
        </div>
        {/* Content Grid (using Tailwind CSS grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-md shadow p-4">
            {" "}
            {/* Example content panel */}
            <div className="font-bold">Tenant</div>
            <div>Tenant Users</div>
          </div>
          {/* Repeat similar structure for other panels */}
          <div className="bg-white rounded-md shadow p-4">
            <div className="font-bold">88 Projects</div>
            <div>Questionnaires</div>
          </div>
          <div className="bg-white rounded-md shadow p-4">
            <div className="font-bold">Controls</div>
            <div>Settings</div>
          </div>
          <div className="bg-white rounded-md shadow p-4">
            <div className="font-bold">Policies</div>
            <div>Frameworks</div>
          </div>
        </div>
        {/* Quick Access Section */}
        <div className="mt-8">
          <div className="text-xl font-bold mb-4">Quick Access</div>
          {/* Replicate grid structure from above for Quick Access items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Add your quick access items here */}
          </div>
        </div>
      </main>
      {/* Fixed Bottom Right Button */}
      <div className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center">
        + {/* Replace with your icon or content */}
      </div>
    </div>
  );
};

export default Dashboard;

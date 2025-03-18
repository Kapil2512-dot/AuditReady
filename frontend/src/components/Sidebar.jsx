import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaToolbox ,
  FaUser,
  FaProjectDiagram,
  FaSignOutAlt,
  FaBook,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clients from backend
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/clients");
        const data = await response.json();
        setClients(data);
        if (data.length > 0) {
          setSelectedClient(data[0]); // Set the first client as default
        } else {
          setSelectedClient(null); // No clients available
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    // Update mobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Close sidebar when clicking outside
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handle client selection change
  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const client = clients.find((c) => c._id === clientId);
    setSelectedClient(client || null);

    // Navigate to the selected client's programs
    if (clientId) {
      navigate(`/program/${clientId}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 h-screen z-50 shadow-lg bg-opacity-90 backdrop-blur-lg w-64 bg-black text-white flex flex-col transition-transform duration-300 p-2
      ${
        isMobile
          ? isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-64"
          : "translate-x-0"
      }`}
    >
      <div
        onClick={() => navigate("/")}
        className="p-4 text-3xl mb-5 font-bold cursor-pointer text-center bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-transparent bg-clip-text"
      >
        AuditReady
      </div>

      {/* Client Dropdown */}
      <div className="p-2">
        <label className="block text-sm font-medium text-gray-300">
          Select Client:
        </label>
        <select
          className="w-full mt-1 p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
          value={selectedClient?._id || ""}
          onChange={handleClientChange}
          disabled={clients.length === 0}
        >
          <option value="" disabled>
            {clients.length === 0 ? "" : "Select a client"}
          </option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-2 cursor-pointer">
          {[
            { path: "/", label: "Home", icon: <FaHome /> },
            { path: "/clients", label: "Client", icon: <FaUser /> },
            {
              path: selectedClient
                ? `/program/${selectedClient._id}`
                : "/program",
              label: selectedClient ? "Programs" : "Programs",
              icon: <FaProjectDiagram />,
            },
            { path: "/frameworks", label: "Frameworks", icon: <FaBook /> },
            { path: "/controls", label: "Controls", icon: <FaToolbox /> },

            { path: "/evidence", label: "Evidence", icon: <FaClipboardList /> },
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

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full p-2 hover:bg-red-700 rounded-lg transition-all duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState("light");
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name") || "User";
  const firstLetter = email ? email.charAt(0).toUpperCase() : "";

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Update credentials
  const handleSaveCredentials = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8000/api/login/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("name", credentials.name);
        setShowSettings(false);
        setError("");
      } else {
        setError(data.message || "Failed to update credentials");
      }
    } catch (error) {
      setError("An error occurred while updating credentials");
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account permanently?")) {
      try {
        const response = await fetch("http://localhost:8000/api/login/delete", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.ok) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          setError("Failed to delete account");
        }
      } catch (error) {
        setError("Error deleting account");
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="fixed w-full top-0 border-b p-4 flex items-center justify-between bg-white shadow-sm">
      {/* Sidebar Toggle */}
      <button className="md:hidden p-2 bg-blue-500 text-white rounded" onClick={toggleSidebar}>
        <Menu />
      </button>

      {/* Logo */}
      <div className="flex-1 ml-20 md:ml-64 text-center md:text-left">
        <span className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-800">
          Your Compliance Partner
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
{/*        
        <button onClick={toggleTheme} className="p-2 text-gray-600 hover:text-gray-800">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button> */}

        {/* Profile */}
        <div className="relative">
          <div
            className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full cursor-pointer"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setShowSettings(false);
              setShowProfile(false);
            }}
          >
            {firstLetter}
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border w-64">
              <div
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowProfile(true);
                  setShowSettings(false);
                }}
              >
                Profile
              </div>
              <div
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowSettings(true);
                  setShowProfile(false);
                }}
              >
                Settings
              </div>
              

              {/* Profile View */}
              {showProfile && (
                <div className="p-4 border-t">
                  <h3 className="font-semibold text-lg mb-2">Profile Information</h3>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Name:</span> {name}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Email:</span> {email}
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="mt-3 w-full bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
                  >
                    Delete Account Permanently
                  </button>
                </div>
              )}

              {/* Settings View */}
              {showSettings && (
  <div className="p-4 border-t">
    <h3 className="font-semibold text-lg mb-2">Update Profile</h3>
    {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleSaveCredentials({
          name: formData.get("name"),
          email: formData.get("email"),
        });
      }}
    >
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={name}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={email}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600">
        Save Changes
      </button>
    </form>
  </div>
)}
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

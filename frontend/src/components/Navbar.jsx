import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState("Dark");
  const [open, setOpen] = useState(false);

  const themes = [
    { name: "Dark", icon: <FaMoon /> },
    { name: "Light", icon: <FaSun /> },
  ];

  return (
    <nav className="fixed w-full ml-15 top-0 p-4 flex items-center justify-between shadow-lg z-10 bg-white">
      {/* Left: Logo */}
      <div
        className=" cursor-pointer text-2xl font-bold bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-transparent bg-clip-text"
        onClick={() => (window.location.href = "/")}
      >
        AuditReady
      </div>

      {/* Spacer to push button to the right */}
      <div className="flex-1"></div>

      {/* Right: Theme Button */}
      <div className="relative mr-29 cursor-pointer">
        <button
          onClick={() => setOpen(!open)}
          className="flex  items-center cursor-pointer px-2 py-1 border rounded bg-gray-100 shadow-md"
        >
          {theme === "Dark" ? (
            <FaMoon className="mr-2" />
          ) : (
            <FaSun className="mr-2" />
          )}
          {theme}
        </button>

        {/* Dropdown Menu */}
        {open && (
          <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded border z-20 w-28">
            {themes.map((t) => (
              <li
                key={t.name}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setTheme(t.name);
                  setOpen(false);
                }}
              >
                {t.icon} <span className="ml-2">{t.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

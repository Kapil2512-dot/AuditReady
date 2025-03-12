import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const Frameworks = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function getFrameworks() {
    try {
      const response = await fetch("http://localhost:8000/api/frameworks");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred.");
      } else {
        setData(result); // Assuming result is an array of frameworks
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    getFrameworks();
  }, []);

  return (
    <div className="flex-1 min-h-screen p-6 bg-white pl-20 md:pl-64 pt-20 md:pt-24 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Frameworks
        </h1>

        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search frameworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Controls
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  About
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data
                  .filter((framework) =>
                    framework.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((framework) => (
                    <tr
                      key={framework._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {framework.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {framework.controls}
                      </td>
                      <td className="py-3 px-4 text-sm text-blue-500 hover:underline cursor-pointer">
                        <Link to={`/frameworks/${framework._id}`}>Detail</Link>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No frameworks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Frameworks;

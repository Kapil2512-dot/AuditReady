import React from "react";
import { useState, useEffect } from "react";
import { FaDownload, FaSyncAlt } from "react-icons/fa";

const Client = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState();

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/api/clients");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred.");
      } else {
        setData(result); // Set the fetched data
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex-1 ml-15 h-screen p-4">
      <div className="mt-20 mx-auto max-w-6xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Clients
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Clients</h2>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                <FaDownload />
              </button>
              <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                <FaSyncAlt />
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
                New
              </button>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Contact
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((client) => (
                  <tr
                    key={client._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm md:text-base">
                      {client.name}
                    </td>
                    <td className="px-4 py-3 text-sm md:text-base">
                      {client.email}
                    </td>
                    <td className="px-4 py-3 text-sm md:text-base">
                      {client.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;

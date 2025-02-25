import React from "react";
import { FaDownload, FaSyncAlt } from "react-icons/fa";

const Client = () => {
  const clients = [
    // {
    //   id: "gnf46dsz",
    //   name: "Kapil",
    //   contact: "jkapil855@gmail.com",
    //   createdAt: "Sat, 15 Feb 2025 16:12...",
    // },
    // {
    //   id: "abc123xyz",
    //   name: "Rahul",
    //   contact: "rahul123@gmail.com",
    //   createdAt: "Sun, 16 Feb 2025 12:45...",
    // },
    // {
    //   id: "kbc6978",
    //   name: "Rishu",
    //   contact: "rishoo123@gmail.com",
    //   createdAt: "Sun, 17 Feb 2025 12:45...",
    // },
  ];

  return (
    <div className="flex-1 ml-15 h-screen p-4">
      <div className="mt-20 mx-auto max-w-6xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Clients
        </h1>

        {/* Check if clients exist */}
        {clients.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            {/* Header Section */}
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
              <table className="w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="block md:table-row absolute -top-full md:relative md:top-auto">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase block md:table-cell">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase block md:table-cell">
                      Contact
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase block md:table-cell">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      className="block md:table-row border md:border-none"
                    >
                      <td
                        className="px-4 py-2 text-sm block md:table-cell"
                        data-label="Name"
                      >
                        {client.name}
                      </td>
                      <td
                        className="px-4 py-2 text-sm block md:table-cell"
                        data-label="Contact"
                      >
                        {client.contact}
                      </td>
                      <td
                        className="px-4 py-2 text-sm block md:table-cell"
                        data-label="Created At"
                      >
                        {client.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 px-4 text-center">
            <h2 className="text-gray-700 text-2xl sm:text-3xl md:text-4xl font-bold">
              Get Started
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base max-w-md">
              Your client does not contain any projects. Projects allow you to
              start working with compliance frameworks.
            </p>
            <button className="mt-5 bg-green-500 hover:bg-green-700 text-white font-bold cursor-pointer  py-2 px-6 sm:px-8 rounded-xl focus:outline-none focus:shadow-outline">
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;

import React, { useState, useEffect } from "react";
import { FaDownload, FaSyncAlt } from "react-icons/fa";

const Client = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Fetch Data from Backend
  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/api/clients");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred.");
      } else {
        setData(result);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  }

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add client");
      }

      // Clear form, close modal, refresh table
      setFormData({ name: "", email: "" });
      setShowModal(false);
      getData(); // Fetch updated data
    } catch (err) {
      console.error(err);
      setError("Failed to add client.");
    }
  }

  // Fetch data when the component loads
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
              <button
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={getData}
              >
                <FaSyncAlt />
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                onClick={() => setShowModal(true)}
              >
                New
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Table */}
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
                {data.length > 0 ? (
                  data.map((client) => (
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
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Client</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;

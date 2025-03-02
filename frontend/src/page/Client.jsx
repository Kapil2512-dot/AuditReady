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
    <div className="flex-1 min-h-screen p-6 bg-white  pl-20 md:pl-64 pt-20 md:pt-24 transition-all duration-300">
      <div className=" mx-auto max-w-6xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Clients
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Client List</h2>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                onClick={() => setShowModal(true)}
              >
                New Client
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Client Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((client) => (
                <div
                  key={client._id}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(client.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No clients found.</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL with Blurry Background */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
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

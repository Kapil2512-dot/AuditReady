import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Client = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", _id: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch Data from Backend
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/clients");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred.");
      } else {
        setData(result); // Update the data state
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  // Handle Form Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Create & Update Client
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await fetch(
          `http://localhost:8000/api/clients/${formData._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch("http://localhost:8000/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit client data.");
      }

      // Success Message
      setSuccess(
        isEditMode
          ? "Client updated successfully!"
          : "Client added successfully!"
      );
      setTimeout(() => setSuccess(""), 2000);

      // Reset form, close modal, refresh data
      setFormData({ name: "", email: "", _id: "" });
      setShowModal(false);
      setIsEditMode(false);
      getData(); // Refetch data to refresh the component
    } catch (err) {
      setError("Failed to add/update client.");
    }
  };

  // Handle Delete Client
  const handleDelete = async (id) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:8000/api/clients/${id}`,
        { method: "DELETE" }
      );

      if (!deleteResponse.ok) {
        const deleteResult = await deleteResponse.json();
        setError(deleteResult.error || "Failed to delete the item.");
        return;
      }

      setSuccess("Client deleted successfully!");
      setTimeout(() => setSuccess(""), 2000);
      getData(); // Refetch data to refresh the component
    } catch (err) {
      setError("An error occurred while deleting. Please try again later.");
    }
  };

  // Handle Edit Client
  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/clients/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred.");
      } else {
        setFormData({
          name: result.name,
          email: result.email,
          _id: result._id,
        });
        setIsEditMode(true);
        setShowModal(true);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <div className="flex-1 min-h-screen p-6 bg-gray-100 pl-20 md:pl-64 pt-20 md:pt-24 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold mb-6">Clients</h1>

        {/* Success & Error Messages */}
        {success && (
          <p className="text-green-600 bg-green-100 p-2 rounded">{success}</p>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              onClick={() => {
                setFormData({ name: "", email: "", _id: "" });
                setIsEditMode(false);
                setShowModal(true);
              }}
            >
              New Client
            </button>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((client) => (
                <div
                  key={client._id}
                  className="relative bg-white rounded-lg shadow-lg p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(client.createdAt).toLocaleDateString()}
                  </p>

                  {/* Edit & Delete Icons */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(client._id)}
                      className="text-gray-500 hover:text-gray-700 text-lg"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center col-span-3">
                <p>No clients found.</p>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  onClick={() => setShowModal(true)}
                >
                  Add a Client
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL with Blurry Background */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white rounded-lg p-6 shadow-xl w-96 transition-transform transform scale-95">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Client" : "Add New Client"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                placeholder="Email"
                required
              />

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
                  {isEditMode ? "Update" : "Add"}
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
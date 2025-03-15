import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Program = () => {
  const { clientId } = useParams();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null); // For description modal
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frameworks, setFrameworks] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch programs for all clients
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/programs");
        if (!response.ok) throw new Error("Failed to fetch programs");
        const programsData = await response.json();
        setPrograms(programsData);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Filter programs by clientId whenever clientId or programs change
  useEffect(() => {
    if (clientId && programs.length > 0) {
      const filtered = programs.filter(
        (program) => program.client._id === clientId
      );
      setFilteredPrograms(filtered);
    } else {
      setFilteredPrograms([]);
    }
  }, [clientId, programs]);

  // Fetch frameworks and clients on component mount
  useEffect(() => {
    const fetchFrameworksAndClients = async () => {
      try {
        const frameworkRes = await fetch("http://localhost:8000/api/frameworks");
        const clientRes = await fetch("http://localhost:8000/api/clients");

        if (!frameworkRes.ok || !clientRes.ok)
          throw new Error("Failed to fetch data");

        const frameworksData = await frameworkRes.json();
        const clientsData = await clientRes.json();

        setFrameworks(frameworksData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching frameworks/clients:", error);
      }
    };

    fetchFrameworksAndClients();
  }, []);

  // Handle form submission for creating a new program
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !selectedFramework || !clientId) return;

    setSubmitting(true);
    const newProgram = {
      name,
      description,
      framework: selectedFramework,
      client: clientId,
    };

    try {
      const response = await fetch("http://localhost:8000/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProgram),
      });

      if (!response.ok) throw new Error("Failed to create program");

      const createdProgram = await response.json();
      setPrograms([createdProgram, ...programs]);

      setShowCreateModal(false);
      setName("");
      setDescription("");
      setSelectedFramework("");
    } catch (err) {
      console.error("Error creating program:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Open the modal for creating a new program
  const handleOpenCreateModal = () => {
    if (clients.length === 0) {
      alert("Please create a client before adding a program.");
      return;
    }
    setShowCreateModal(true);
  };

  // Handle program deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/programs/${id}`, {
        method: "DELETE",
      });
      setPrograms(programs.filter((program) => program._id !== id));
    } catch (err) {
      console.error("Error deleting program:", err);
    }
  };

  // Open the description modal
  const handleOpenDescriptionModal = (program) => {
    setSelectedProgram(program);
    setShowDescriptionModal(true);
  };

  // Close the description modal
  const handleCloseDescriptionModal = () => {
    setSelectedProgram(null);
    setShowDescriptionModal(false);
  };

  // Get the selected client's name
  const selectedClient = clients.find((client) => client._id === clientId);

  return (
    <div className="flex-1 min-h-screen p-6 bg-white pl-20 md:pl-64 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Programs</h1>
          <button
            onClick={handleOpenCreateModal}
            className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow 
              ${
                clients.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            disabled={clients.length === 0}
          >
            <FaPlus className="mr-2" /> Create Program
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading programs...</p>
        ) : filteredPrograms.length === 0 ? (
          <p className="text-gray-500 text-center">
            No programs available for this client. Create one!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program) => {
              const completionPercentage = Math.floor(Math.random() * 100);

              return (
                <div
                  key={program._id}
                  className="relative bg-white text-gray-900 p-6 rounded-xl shadow-xl border border-gray-300 transform transition duration-300 hover:shadow-2xl"
                  onClick={() => handleOpenDescriptionModal(program)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card click event
                      handleDelete(program._id);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">
                    {program.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Client: {program.client?.name}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Framework: {program.framework?.name}
                  </p>
                  <div className="mt-4 w-20 h-20 mx-auto">
                    <CircularProgressbar
                      value={completionPercentage}
                      text={`${completionPercentage}%`}
                      styles={{
                        path: {
                          stroke: `rgba(37, 99, 235, ${completionPercentage / 100})`,
                        },
                        text: {
                          fill: "#1e3a8a",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Program Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Create a New Program
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Program Name"
                  required
                  className="w-full p-2 border rounded mb-4"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows="3"
                  required
                  className="w-full p-2 border rounded mb-4"
                />
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  required
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="">Select Framework</option>
                  {frameworks.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <div className="w-full p-2 border rounded mb-4 bg-gray-100">
                  <p className="text-gray-700">
                    Client: {selectedClient?.name || "No client selected"}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow ${
                      submitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {submitting ? "Creating..." : "Create Program"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Description Modal */}
        {showDescriptionModal && selectedProgram && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                {selectedProgram.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedProgram.description}
              </p>
              <button
                onClick={handleCloseDescriptionModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Program;
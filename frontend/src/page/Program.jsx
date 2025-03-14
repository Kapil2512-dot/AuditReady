import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaInfoCircle } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frameworks, setFrameworks] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProgramDescription, setSelectedProgramDescription] =
    useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  // Fetch frameworks, clients, and programs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const frameworkRes = await fetch(
          "http://localhost:8000/api/frameworks"
        );
        const clientRes = await fetch("http://localhost:8000/api/clients");

        if (!frameworkRes.ok || !clientRes.ok)
          throw new Error("Failed to fetch frameworks or clients");

        const frameworksData = await frameworkRes.json();
        const clientsData = await clientRes.json();

        setFrameworks(frameworksData);
        setClients(clientsData);

        const programRes = await fetch("http://localhost:8000/api/programs");
        if (!programRes.ok) throw new Error("Failed to fetch programs");
        const programsData = await programRes.json();

        setPrograms(programsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !selectedFramework || !selectedClient) return;

    setSubmitting(true);
    const newProgram = {
      name,
      description,
      framework: selectedFramework,
      client: selectedClient,
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

      setShowModal(false);
      setName("");
      setDescription("");
      setSelectedFramework("");
      setSelectedClient("");
    } catch (err) {
      console.error("Error creating program:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenModal = () => {
    if (clients.length === 0) {
      alert("Please create a client before adding a program.");
      return;
    }
    setShowModal(true);
  };

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

  const handleOpenDescriptionModal = (description) => {
    setSelectedProgramDescription(description);
    setShowDescriptionModal(true);
  };

  return (
    <div className="flex-1 min-h-screen p-6 bg-white pl-20 md:pl-64 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Programs</h1>
          <button
            onClick={handleOpenModal}
            className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow 
  ${
    clients.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
  }`}
            disabled={clients.length === 0}
          >
            <FaPlus className="mr-2" /> Create Program
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading programs...</p>
        ) : programs.length === 0 ? (
          <p className="text-gray-500 text-center">
            No programs available. Create one!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const completionPercentage = Math.floor(Math.random() * 100);

              return (
                <div
                  key={program._id}
                  className="relative bg-white text-gray-900 p-6 rounded-xl shadow-xl border border-gray-300 transform transition duration-300 hover:shadow-2xl"
                >
                  <button
                    onClick={() =>
                      handleOpenDescriptionModal(program.description)
                    }
                    className="absolute top-3 right-12 text-gray-600 p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaInfoCircle className="text-xl" />
                  </button>

                  <button
                    onClick={() => handleDelete(program._id)}
                    className="absolute top-3 right-3 text-white bg-red-600 p-2 rounded-full hover:bg-red-800"
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
                          stroke: `rgba(37, 99, 235, ${
                            completionPercentage / 100
                          })`,
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

        {/* Description Modal */}
        {showDescriptionModal && (
          <div className="fixed inset-0  bg-opacity-50 bg-black/50 flex justify-center items-center backdrop-blur-md">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Program Description
              </h2>
              <p className="text-gray-700">{selectedProgramDescription}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowDescriptionModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Program Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center backdrop-blur-md">
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
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  required
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="">Select Client</option>
                  {clients.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
      </div>
    </div>
  );
};

export default Program;

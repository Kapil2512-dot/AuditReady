import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams(); // Get framework ID from URL
  const [framework, setFramework] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFramework() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/frameworks/${id}`
        );
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to fetch details.");
        } else {
          setFramework(result);
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      }
    }

    fetchFramework(); // ✅ Call the function inside useEffect
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!framework) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading framework details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 border">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-4">
          {framework.name}
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Overview</h2>
          <p className="text-gray-600 leading-relaxed">{framework.about}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Number of Controls
          </h2>
          <p className="text-gray-700 text-lg font-medium bg-gray-200 p-3 rounded-lg">
            {framework.controls}
          </p>
        </div>

        <div className="flex justify-end">
          <Link
            to="/frameworks"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;

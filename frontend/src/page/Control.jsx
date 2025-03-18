import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const Control = ({ frameworkId }) => {
  const [controls, setControls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!frameworkId) return;
    const fetchControls = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/controls/framework/${frameworkId}`
        );
        setControls(res.data);
      } catch (error) {
        console.error("Error fetching controls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchControls();
  }, [frameworkId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Controls</h2>
      {loading ? (
        <p>Loading...</p>
      ) : controls.length === 0 ? (
        <p>No controls found for this framework.</p>
      ) : (
        <ul className="list-disc pl-5">
          {controls.map((control) => (
            <li key={control._id} className="py-1">{control.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Control;

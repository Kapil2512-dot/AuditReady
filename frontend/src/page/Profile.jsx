import React from "react";

const Profile = ({ user, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-700">Name: {user.name}</p>
          <p className="text-sm text-gray-700">Email: {user.email}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Account
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
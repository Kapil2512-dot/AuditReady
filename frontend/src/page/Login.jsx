import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./api"; // Adjust the import path to your API component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser(email, password);
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", email); // Store the user's email
      navigate("/");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 w-96 shadow-2xl border border-white border-opacity-20">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
          AuditReady
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            LOGIN
          </button>
          <div className="mt-6 text-center text-gray-700">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>

        {/* Notification-style Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                Invalid Credentials
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                Please check your email and password and try again.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

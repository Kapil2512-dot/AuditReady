import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./api"; // Import the API utility

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login API
      const response = await loginUser(email, password);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      // Redirect to the home page or dashboard after successful login
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 w-96 shadow-2xl border border-white border-opacity-20">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
          AuditReady
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Retype Password:", retypePassword);

    // Add validation: Check if passwords match, etc.
    if (password !== retypePassword) {
      alert("Passwords do not match!");
      return; // Stop form submission
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 h-screen w-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className=" bg-gradient-to-r from-sky-500 via-[#4361EE] to-purple-800 text-transparent bg-clip-text text-2xl font-bold  mb-4 text-center">
          AuditReady
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              SIGN UP
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 hover:text-green-700">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./page/Home";
import Client from "./page/Client";
import Policies from "./page/Policies";
import Evidence from "./page/Evidence";
import Program from "./page/Program";
import "./App.css";
import Control from "./page/Control";
import Login from "./page/Login";
import SignUp from "./page/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 p-4">
            {/* This is where the routed components will appear */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<Client />} />
              <Route path="/program" element={<Program />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/Evidence" element={<Evidence />} />
              <Route path="/controls" element={<Control />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

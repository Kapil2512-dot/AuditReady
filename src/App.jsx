import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./page/Home";
import Tenants from "./page/Tenants";
import Projects from "./page/Projects";
import "./App.css";

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
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

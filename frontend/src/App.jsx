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
import Frameworks from "./page/Frameworks";
import Detail from "./page/Detail";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex-1 p-4">
            {/* This is where the routed components will appear */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<Client />} />
              <Route path="/program" element={<Program />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/evidence" element={<Evidence />} />
              <Route path="/controls" element={<Control />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/frameworks" element={<Frameworks />} />
              <Route path="/frameworks/:id" element={<Detail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

// MainLayout Component (for routes with Navbar and Sidebar)
const MainLayout = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes (without Navbar and Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes (with Navbar and Sidebar) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Client />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/program/:clientId"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Program />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/program"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Program />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/policies"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Policies />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/evidence"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Evidence />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/controls"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Control />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/frameworks"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Frameworks />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/frameworks/:id"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Detail />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect to Login if no route matches */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
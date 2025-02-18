import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Container for Navbar */}
        <div className="flex flex-col  flex-1">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Home;

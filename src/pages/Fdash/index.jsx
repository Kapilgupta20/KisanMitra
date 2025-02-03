import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Weather from "./components/weathercmp";

const Fdashboard = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - Weather Component */}
        <div className="flex-1 p-8">
          <Weather />
        </div>
      </div>
    </>
  );
};

export default Fdashboard;

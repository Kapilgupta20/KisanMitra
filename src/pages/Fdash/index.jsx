import React from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from './components/SideBar';
import Weather from './components/Weathercmp';
import Header from "./components/Header";

const Fdashboard = () => {
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64">
          <Sidebar />
        </div>

        {/* Main Content - Scrollable */}
        <div className="ml-64 flex-1 p-8 mt-[64px] h-[calc(100vh-64px)] overflow-y-auto">
          <Weather />
        </div>
      </div>
    </>
  );
};

export default Fdashboard;

import React from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from './components/SideBar';
import Weather from './components/weathercmp';
import Header from "./components/Header";
import FooterCmp from './components/Footer';

const Fdashboard = () => {
  return (
<div className="min-h-screen">
    {/* Header - fixed */}
    <div className="fixed top-0 left-0 w-full z-50">
      <Header />
    </div>

    {/* Sidebar - fixed */}
    <div className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] z-40 bg-white shadow">
      <Sidebar />
    </div>

    <div className="ml-64 pt-[64px] min-h-screen flex flex-col">
      <main className="p-8 flex-grow">
        <Weather/>
      </main>
        <FooterCmp/>
    </div>
</div>
    
  );
};

export default Fdashboard;

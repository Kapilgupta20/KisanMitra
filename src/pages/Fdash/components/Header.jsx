import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import sproutLogo from '../../../assets/sprout.svg';
import { User, ChevronDown, LogOut, Info } from "lucide-react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Function to handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener when dropdown is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    return (
        <header className="bg-[#D1E8D0] text-[#2A2A2A]">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={sproutLogo} alt="KisanMitra Logo" className="h-8 w-8 mr-2" />
                    {/* <h1 className="text-2xl font-bold text-[#2A2A2A] cursor-pointer" onClick={() => navigate('/')}>KisanMitra</h1> */}
                    <Link to="/FDashboard" className="text-2xl font-bold text-[#2A2A2A]">KisanMitra</Link>
                </div>

                <nav>
                <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Button to Toggle Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        <User className="w-5 h-5 mr-2" />
        <span>User</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg">
          <ul className="py-2 text-gray-700">
            <li>
              <button
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("View Details clicked")}
              >
                <Info className="w-4 h-4 mr-2" />
                View Details
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={() => alert("Signed out")}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

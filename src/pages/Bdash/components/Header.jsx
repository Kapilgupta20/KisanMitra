import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import sproutLogo from '../../../assets/sprout.svg';
import { User, ChevronDown, LogOut, Info } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    localStorage.clear();
  };

  return (
    <header className="bg-[#2A2A2A] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={sproutLogo} alt="KisanMitra Logo" className="h-8 w-8 mr-2" />
          <Link to="/Bdashboard" className="text-2xl font-bold text-white hover:text-[#A8CBB5] transition-colors">
            KisanMitra
          </Link>
        </div>

        <nav>
          <div ref={dropdownRef} className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-4 py-2 bg-[#A8CBB5] text-[#2A2A2A] hover:bg-[#91bca6] rounded-md shadow-md transition duration-200 ease-in-out"
            >
              <User className="w-5 h-5 mr-2" />
              <span>User</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg">
                <ul className="py-2 text-gray-700">
                  <li>
                    <Link
                      className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
                      to="/Bdashboard/info"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                      to="/"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Link>
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

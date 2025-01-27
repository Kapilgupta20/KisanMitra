import React from "react";
import { Link } from "react-router-dom";
import sproutLogo from '../assets/sprout.svg'; // Assuming the same logo is used

const HeaderCmp = () => {
  return (
    <header className="bg-[#D1E8D0] text-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"> {/* Reduced padding */}
        {/* Logo and name */}
        <div className="flex items-center">
          <img src={sproutLogo} alt="KisanMitra Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold text-[#2A2A2A]">KisanMitra</h1>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-[#A8CBB5] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#A8CBB5] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="px-4 py-2 bg-[#2A2A2A] text-white rounded-md hover:bg-[#A8CBB5] transition-colors"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderCmp;

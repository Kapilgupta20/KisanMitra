import React from "react";
import { Link } from "react-router-dom";
import sproutLogo from '../assets/sprout.svg';

const HeaderCmp = () => {
  return (
    <header className="bg-[#2A2A2A] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={sproutLogo} alt="KisanMitra Logo" className="h-8 w-8 mr-2" />
          <Link to="/" className="text-2xl font-bold text-white hover:text-[#A8CBB5] transition-colors">
            KisanMitra
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6 items-center">
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
                to="/helpdesk"
                className="hover:text-[#A8CBB5] transition-colors"
              >
                Helpdesk
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                className="px-4 py-2 bg-[#A8CBB5] text-[#2A2A2A] font-medium rounded-md hover:bg-[#91bca6] transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderCmp;

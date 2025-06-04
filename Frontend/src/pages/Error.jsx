import React from "react";
import { Link } from "react-router-dom";
import sproutLogo from '../assets/sprout.svg'; // Assuming the same logo is used
import HeaderCmp from "../components/headercmp";
import FooterCmp from "../components/footercmp";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#D1E8D0] text-[#2A2A2A]">
      {/* Header */}
      {/* <HeaderCmp/> */}

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
          <p className="text-xl mb-6">We couldn't find the page you were looking for.</p>
          <Link
            to="/"
            className="px-6 py-2 bg-[#2A2A2A] text-white rounded-md hover:bg-[#A8CBB5] transition-colors"
          >
            Go Back to Home
          </Link>
        </div>
      </div>

      {/* <FooterCmp/> */}
    </div>
  );
};

export default NotFound;

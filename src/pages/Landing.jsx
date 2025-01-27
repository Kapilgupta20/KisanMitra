import React from "react";
import { useNavigate } from "react-router-dom";
import FooterCmp from "../components/footercmp.jsx";
import HeaderCmp from "../components/headercmp.jsx";

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderCmp/>
            {/* Main content */}
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Landing Page</h1>
                <button
                    className="px-6 py-2 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => navigate("/login")}
                >
                    Get Started
                </button>
                <button
                    className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => navigate("/about")}
                >
                    About Us
                </button>
            </div>

            {/* Footer */}
            <FooterCmp />
        </div>
    );
};

export default Landing;

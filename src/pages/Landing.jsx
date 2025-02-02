import React from "react";
import { useNavigate } from "react-router-dom";
import FooterCmp from "../components/footercmp.jsx";
import HeaderCmp from "../components/headercmp.jsx";
import ContactForm from "../components/contactcmp.jsx";

const Landing = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col min-h-screen bg-[#D1E8D0]">
            <HeaderCmp />
            
            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
                {/* Logo Placeholder */}
                <div className="mb-6">
                    <img src="/logo.png" alt="KisanMitra Logo" className="w-24 h-24" />
                </div>
                
                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-[#2A2A2A] mb-4">Welcome to KisanMitra</h1>
                <p className="text-lg text-[#4A4A4A] mb-6 max-w-2xl">
                    Empowering Farmers & Buyers with a seamless platform to connect, trade, and grow together. 
                    Join us today and be a part of the future of agriculture!
                </p>
                
                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        className="px-6 py-2 text-white bg-[#2A2A2A] rounded-lg hover:bg-[#A8CBB5] transition-colors"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                    <button
                        className="px-6 py-2 border-2 border-[#2A2A2A] text-[#2A2A2A] rounded-lg hover:bg-[#A8CBB5] transition-colors"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </div>
            
            <FooterCmp />
        </div>
    );
};

export default Landing;

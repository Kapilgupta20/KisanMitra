import React from "react";
import FooterCmp from "../components/footercmp.jsx";

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-2xl font-bold">About Page</h1>
            </div>

            {/* Footer */}
            <FooterCmp />
        </div>
    );
};

export default About;

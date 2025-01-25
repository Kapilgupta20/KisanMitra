import React from "react";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>Landing Page</div>
            <button
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => navigate('/login')}
            >
                Get Started
            </button>
            <br />
            <button
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => navigate('/about')}
            >
                About Us
            </button>
        </>
    );
};

export default Landing;
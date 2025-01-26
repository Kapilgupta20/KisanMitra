import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCmp from '../components/logincmp.jsx'

const Login = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>Login Page</div>
            <LoginCmp/>
            <button
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => navigate('/register')}
            >
                Register
            </button>
        </>
    );
}

export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react'; // Import cross icon from lucide-react

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', formData.email);
      if (response.data.role === 'farmer') {
        navigate('/FDashboard');
      } else if (response.data.role === 'buyer') {
        navigate('/BDashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#D1E8D0] flex flex-col">
      <div className="flex justify-between p-4">
        <button onClick={() => navigate('/home')} className="text-[#2A2A2A]">
          <X size={24} />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-[#2A2A2A]">Login</h2>
          {error && (
            <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#2A2A2A]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#2A2A2A]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#2A2A2A] focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2A2A2A] text-white py-2 px-4 rounded-md hover:bg-[#A8CBB5] transition-colors focus:outline-none cursor-pointer mt-4"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-[#2A2A2A]">
            Don't have an account?{' '}
            <button
              className="text-[#A8CBB5] hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register Here!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

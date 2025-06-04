import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react'; // Import the X (cross) icon from lucide-react
import { citiesByState, statesAndUTs } from '../data';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    aadhar: '',
    role: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);  // State to hold cities based on selected state
  const navigate = useNavigate();
  const APIURL = import.meta.env.VITE_API;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });

    // Update the cities based on selected state
    if (citiesByState[selectedState]) {
      setCities(citiesByState[selectedState]);
    } else {
      setCities([]); // Clear cities if no matching state found
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(APIURL + '/user/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('Registration successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', formData.email);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem("loginTime", Date.now());
      if (formData.role === 'farmer') {
        localStorage.setItem('city', response.data.city);
        navigate('/Fdashboard');
      } else if (formData.role === 'buyer') {
        navigate('/Bdashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#D1E8D0] flex flex-col">
      <div className="absolute top-4 left-4 text-gray-700 cursor-pointer" onClick={() => navigate('/home')}>
        <X size={24} />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-[#2A2A2A] mb-6">Register</h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#2A2A2A]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#2A2A2A]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-[#2A2A2A]">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
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
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="aadhar" className="block text-sm font-medium text-[#2A2A2A]">
                  Aadhar
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A2A2A]">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="farmer">Farmer</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="state" className="block text-sm font-medium text-[#2A2A2A]">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {statesAndUTs.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-[#2A2A2A]">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="pincode" className="block text-sm font-medium text-[#2A2A2A]">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#A8CBB5] focus:border-[#A8CBB5]"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2A2A2A] text-white py-2 rounded-md hover:bg-[#A8CBB5]"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-[#2A2A2A]">
            Already created an Account!{' '}
            <button
              className="text-[#A8CBB5] hover:underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login Here!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

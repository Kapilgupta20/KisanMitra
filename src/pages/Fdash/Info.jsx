import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import FooterCmp from './components/Footer';

const Fdetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const APIURL = import.meta.env.VITE_API;

  const fetchIdDetails = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token || !email) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(APIURL + '/user/iddetails', { email: email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (err) {
      setError(err.message);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchIdDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<div className="min-h-screen">
    {/* Header - fixed */}
    <div className="fixed top-0 left-0 w-full z-50">
      <Header />
    </div>

    {/* Sidebar - fixed */}
    <div className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] z-40 bg-white shadow">
      <Sidebar />
    </div>

    <div className="ml-64 pt-[64px] min-h-screen flex flex-col">
  <main className="p-8 flex-grow bg-gray-50">
    <h2 className="text-2xl font-bold mb-6">Personal Details</h2>

    {user ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Username</p>
          <p className="text-lg font-semibold">{user.name}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Email</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Role</p>
          <p className="text-lg font-semibold">{user.role}</p>
        </div>
      </div>
    ) : (
      <p className="text-gray-500">Loading user details...</p>
    )}
  </main>

  <FooterCmp />
</div>


  </div>
  );
};

export default Fdetails;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';

const Fdetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchIdDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const email = localStorage.getItem('email');
    try {
      const response = await axios.post('http://localhost:8000/user/iddetails', { email: email }, {
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
    <div>
      <Header />
      <h2>Dashboard</h2>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default Fdetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/SideBar";

const Bdash = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const APIURL = import.meta.env.VITE_API;

  const fetchbids = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token || !email) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(APIURL + '/bdashboard/bids/view', { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setdata(response.data);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    fetchbids();
  }, []);

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <h1>Buyer Dashboard</h1>
      {data.map((item,index) => (
        <div key={index}> {item.femail}, {item.price}, {item.status} </div>
      ))};
    </div>
  );
};

export default Bdash;
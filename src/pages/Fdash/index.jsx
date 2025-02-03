import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/SideBar';

const Fdashboard = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar/>
    </div>
  );
};

export default Fdashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';

const Fdashboard = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      
    </div>
  );
};

export default Fdashboard;
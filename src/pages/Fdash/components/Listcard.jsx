import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircleChevronRight } from 'lucide-react';

const Listcard = ({ item, handleDelete }) => {
  const [data, setdata] = useState(null);
  const [error, setError] = useState(null);

  const fetchbids = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const response = await axios.post(import.meta.env.VITE_API + '/fdashboard/listings/view/bids', { listingId: item._id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setdata(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchbids();
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-3xl">
      <h2 className="text-xl font-bold mb-3 text-[#2A2A2A]">{item.croptype}</h2>

      <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
        <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
        <p><span className="font-medium">Cropping Time:</span> {item.croppingtime}</p>
        <p><span className="font-medium">Harvesting Time:</span> {item.harvestingtime}</p>
        <p><span className="font-medium">Price:</span> ₹ {item.price}</p>
        <p><span className="font-medium">Location:</span> {item.fcity}, {item.fstate} - {item.fpincode}</p>
        <p><span className="font-medium">End Date:</span> {item.endDate}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(item._id)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
      >
        Delete
      </button>

      {/* Bids Section */}
      <div className="mt-3 border-t pt-3">
        <h3 className="text-md font-semibold text-[#2A2A2A] mb-2">Bids:</h3>
        <div className="overflow-x-auto whitespace-nowrap flex gap-2">
          {data && data.map((bid, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg flex items-center gap-2 shadow-md text-sm">
              <span className="font-medium">{bid.fname}</span>
              <span className="text-green-600 font-semibold">₹ {bid.price}</span>
              <button>
                <CircleChevronRight className="w-4 h-4 text-gray-700 hover:text-gray-900 transition" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listcard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircleChevronRight } from 'lucide-react';

const Listcard = ({ item, handleDelete }) => {
  const [data, setdata] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [selectedCrop, setSelectedCrop] = useState(null);
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
  }

  useEffect(() => {
    fetchbids();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-3">{item.croptype}</h2>
      <div className="text-gray-700 space-y-2">
        <p>
          <span className="font-medium">Quantity:</span> {item.quantity}
        </p>
        <p>
          <span className="font-medium">Cropping Time:</span> {item.croppingtime}
        </p>
        <p>
          <span className="font-medium">Harvesting Time:</span> {item.harvestingtime}
        </p>
        <p>
          <span className="font-medium">Price:</span> ₹ {item.price}
        </p>
        <p>
          <span className="font-medium">Location:</span> {item.fcity}, {item.fstate} - {item.fpincode}
        </p>
        <p>
          <span className="font-medium">Email:</span> {item.email}
        </p>
        <p>
          <span className="font-medium">End Date:</span> {item.endDate}
        </p>
      </div>
      <button
        onClick={() => handleDelete(item._id)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
      >
        Delete
      </button>
      <div>
        {data && data.map((bid) => (
          <>{bid.fname} {bid.price} <button onClick={() => openmodal(bid)}><CircleChevronRight /></button></>
        ))}
      </div>
    </div>
  );
};

export default Listcard;

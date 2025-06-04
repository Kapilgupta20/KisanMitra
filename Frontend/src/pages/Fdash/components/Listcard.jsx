import React from 'react';
import { CircleChevronRight } from 'lucide-react';

const Listcard = ({ item, handleDelete, onselectbid }) => {

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

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(item._id)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
      >
        Delete
      </button>
      <div>
        {item.bids && item.bids.filter(bid => bid.status === "pending").map((bid) => (
          <div key={bid._id}>{bid.bname} {bid.price} <button className="cursor-pointer" onClick={() => onselectbid(item, bid)}><CircleChevronRight /></button></div>
        ))}
      </div>
    </div>
  );
};

export default Listcard;

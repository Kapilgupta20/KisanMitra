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

      {/* Raised Bids Heading */}
      <h3 className="mt-6 mb-2 text-lg font-semibold text-[#3E6A49]">
        Raised Bids
      </h3>

      <div>
        {item.bids && item.bids.filter(bid => bid.status === "pending").map((bid) => (
          <div
  key={bid._id}
  className="flex justify-between items-center bg-[#F5F9F4] border border-[#A8CBB5] p-3 mt-2 rounded-md shadow-sm"
>
  <div>
    <p className="text-sm font-semibold text-[#2A2A2A]">{bid.bname}</p>
    <p className="text-sm text-[#4A4A4A]">₹ {bid.price}</p>
  </div>
  <button
    className="text-[#4A7C59] hover:text-[#2A2A2A] transition-colors"
    onClick={() => onselectbid(item, bid)}
  >
    <CircleChevronRight className="w-5 h-5" />
  </button>
</div>


        ))}
      </div>
    </div>
  );
};

export default Listcard;
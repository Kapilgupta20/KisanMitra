import React from 'react';

const Listcard = ({ item }) => {
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
    </div>
  );
};

export default Listcard;

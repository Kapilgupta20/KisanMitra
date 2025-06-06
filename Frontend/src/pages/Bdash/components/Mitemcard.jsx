import React from "react";
import { HandshakeIcon, HeartIcon } from 'lucide-react';

const Mitemcard = ({ item, openmodal, isFavourited, toggleFavourite }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow relative">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.croptype}</h3>
                    <p className="text-sm text-gray-600">{item.fname}</p>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium text-green-600">₹{item.price}/kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-medium text-gray-900">{item.quantity} kgs</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium text-gray-900">{item.fcity}, {item.fstate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Cropping Time:</span>
                    <span className="font-medium text-gray-900">{item.croppingtime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Harvest Time:</span>
                    <span className="font-medium text-gray-900">{item.harvestingtime}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                    onClick={() => openmodal(item)}
                    className="w-full sm:flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors hover:cursor-pointer"
                >
                    <HandshakeIcon className="h-4 w-4" />
                    <span>Express Interest</span>
                </button>

                <button
                    onClick={() => toggleFavourite(item._id)}
                    className="text-gray-400 hover:text-green-500 transition-colors hover:cursor-pointer"
                    aria-label="Toggle Favourite"
                >
                    <HeartIcon
                        className={`h-6 w-6 ${isFavourited ? 'fill-green-500 text-green-500' : 'fill-none'}`}
                    />
                </button>
            </div>
        </div>
    );
};

export default Mitemcard;

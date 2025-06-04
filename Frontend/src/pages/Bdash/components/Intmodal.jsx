import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export function ExpressInterestModal({ item, isOpen, onClose, onSubmit }) {
    const [amount, setAmount] = useState(Number(item.price) || 0);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(item._id, amount, item.email, item.fname);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Express Interest</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.croptype}</h3>
                            <p className="text-sm text-gray-600">{item.fname}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Current Price: ₹</span>
                                <span className="ml-2 font-medium text-gray-900">{item.price}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Location:</span>
                                <span className="ml-2 font-medium text-gray-900">{item.fcity}, {item.fstate}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Quantity:</span>
                                <span className="ml-2 font-medium text-gray-900">{item.quantity} kgs</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Contract End Date:</span>
                                <span className="ml-2 font-medium text-gray-900">{item.endDate}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Price Offer (per kg)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="pl-8 w-full rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-600">
                                This will send a notification to the farmer. They will review your offer and will respond to you. You can track the status in your dashboard.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                            >
                                Submit Interest
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

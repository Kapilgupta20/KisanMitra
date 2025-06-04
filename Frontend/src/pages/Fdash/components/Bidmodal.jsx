import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X, AlertCircle } from 'lucide-react';

const Bidmodal = ({ item, bid, isOpen, onClose }) => {
    const [price, setprice] = useState("");
    const [error, setError] = useState(null);
    const APIURL = import.meta.env.VITE_API;
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to start negotiation for this offer?");
        if (!isConfirmed) {
            return;
        };
        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/view/bids/negotiate', {
                bidId: bid._id,
                price: price
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert("Negotiation started successfully!");
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const onAccept = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        const isConfirmed = window.confirm("Are you sure you want to make a contract with this offer?");
        if (!isConfirmed) {
            return;
        };
        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/view/bids/agree', { bidId: bid._id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert("Contract made successfully!");
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const onReject = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        const isConfirmed = window.confirm("Are you sure you want to reject this offer?");
        if (!isConfirmed) {
            return;
        };
        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/view/bids/reject', { bidId: bid._id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert("Offer rejected!");
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Address Interest</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.croptype}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Listed Price: ₹</span>
                                <span className="ml-2 font-medium text-gray-900">{item.price}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Buyer:</span>
                                <span className="ml-2 font-medium text-gray-900">{bid.bname}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Quantity:</span>
                                <span className="ml-2 font-medium text-gray-900">{item.quantity} kgs</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Offer Price: ₹</span>
                                <span className="ml-2 font-medium text-gray-900">{bid.price}</span>
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
                                    value={price}
                                    onChange={(e) => setprice(Number(e.target.value))}
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
                                Start Negotiation
                            </button>
                            <button
                                type="button"
                                onClick={onAccept}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Accept Interest
                            </button>
                            <button
                                type="button"
                                onClick={onReject}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Reject Interest
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Bidmodal;


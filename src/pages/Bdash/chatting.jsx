import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Sidebar from './components/SideBar';
import Header from './components/Header';

const Bchat = () => {
    const [chats, setchats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [counterOffer, setCounterOffer] = useState({ price: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const APIURL = import.meta.env.VITE_API;

    const fetchChats = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(APIURL + '/bdashboard/chats', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setchats(response.data);
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        fetchChats();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'negotiating':
                return 'bg-blue-50 text-blue-600';
            case 'pending approval':
                return 'bg-yellow-50 text-yellow-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    const handleSubmitCounter = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        const isConfirmed = window.confirm("Are you sure you want to send a counter offer for this crop?");
        if (!isConfirmed) {
            return;
        };
        try {
            const response = await axios.put(APIURL + '/bdashboard/chats/sendmes', { chatId: selectedChat._id, message: counterOffer.price }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setCounterOffer({ price: '' });
        } catch (err) {
            setError(err);
        }
    };

    const onAccept = async() => {
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
            const response = await axios.post(APIURL + '/bdashboard/chats/agree', { chatId: selectedChat._id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert("Contract made successfully!");
        } catch (err) {
            setError(err.message);
        }
    }

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
            const response = await axios.put(APIURL + '/bdashboard/chats/reject', { chatId: selectedChat._id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert("Offer rejected!");
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex">
                <Sidebar />
                <div className="flex-1 overflow-auto">
                    <Header />

                    <main className="p-6">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Active Negotiations</h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm">
                                    <div className="p-4 border-b">
                                        <h2 className="text-lg font-semibold text-gray-900">Ongoing Negotiations</h2>
                                    </div>
                                    <div className="divide-y">
                                        {chats.map((chat,index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedChat(chat)}
                                                className={`w-full p-4 text-left hover:bg-gray-50 cursor-pointer transition-colors ${selectedChat?._id === chat._id ? 'bg-gray-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{chat.fname}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(chat.status)}`}>
                                                        {chat.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">{chat.crop}</div>
                                                <div className="text-sm text-gray-600">
                                                    {chat.quantity} kgs at ₹{chat.price}/kg
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                {selectedChat ? (
                                    <div className="bg-white rounded-xl shadow-sm">
                                        <div className="p-6 border-b">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900">{selectedChat.fname}</h2>
                                                    <p className="text-gray-600">{selectedChat.crop}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedChat.status)}`}>
                                                    {selectedChat.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Listed Quantity:</span>
                                                    <span className="ml-2 font-medium text-gray-900">{selectedChat.quantity} kg</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Listed Price:</span>
                                                    <span className="ml-2 font-medium text-gray-900">₹{selectedChat.price}/kg</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 border-b">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Negotiation History</h3>
                                            <div className="space-y-4">
                                                {selectedChat.messages?.map((entry,index) => (
                                                    <div key={index} className={`flex gap-4 ${entry.sender === "buyer" ? 'flex-row-reverse' : ''}`}>
                                                        <div
                                                            className={`flex-1 p-4 rounded-lg ${entry.sender === "buyer" ? 'bg-green-50 text-green-900' : 'bg-gray-50 text-gray-900'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="font-medium">
                                                                    {entry.sender === "buyer" ? 'Your Offer' : "Farmer's Offer"}
                                                                </span>
                                                                <span className="text-sm text-gray-500">{entry.timestamp}</span>
                                                            </div>
                                                            <div className="space-y-2 text-sm">
                                                                <div>
                                                                    <span className="text-gray-600">Price:</span>
                                                                    <span className="ml-2 font-medium">₹{entry.message}/kg</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedChat.status.toLowerCase() === "negotiating" && selectedChat.bagree === false && (
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Counter Offer</h3>
                                                <form onSubmit={handleSubmitCounter} className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Price per kg</label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                                                <input
                                                                    type="number"
                                                                    value={counterOffer.price}
                                                                    onChange={(e) => setCounterOffer({ ...counterOffer, price: e.target.value })}
                                                                    className="pl-8 w-full rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 cursor-pointer">
                                                            Submit Counter Offer
                                                        </button>
                                                        <button onClick={onAccept} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer">
                                                            Accept Offer
                                                        </button>
                                                        <button onClick={onReject} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 cursor-pointer">
                                                            Reject Offer
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                        {selectedChat.bagree === true && (
                                            <div className="p-6">
                                                <h3>Waiting for farmer's response</h3>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Negotiation Selected</h3>
                                        <p className="text-gray-600">Select a negotiation from the list to view details and respond</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Bchat;
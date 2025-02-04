import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Mitemcard from "./components/Mitemcard";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import { Filter, MapPin } from 'lucide-react';
import { statesAndUTs } from "../../data";
import { ExpressInterestModal } from "./components/Intmodal";

const Marketplace = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const navigate = useNavigate();
    const APIURL = import.meta.env.VITE_API;

    const openModal = (crop) => {
        setSelectedCrop(crop);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCrop(null);
    };

    const handleSubmit = async (listingId, price, femail) => {
        const token = localStorage.getItem('token');
        const bemail = localStorage.getItem('email');
        if (!token || !bemail) {
            navigate('/login');
            return;
        };
        const isConfirmed = window.confirm("Are you sure you want to raise your interest in this crop?");
        if (!isConfirmed) {
            return;
        };
        console.log({ listingId, femail, price, bemail });
        try {
            const response = await axios.post(APIURL + '/bdashboard/bids/create', { listingId, femail, price, bemail }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        } catch (err) {
            setError(err);
        }
        closeModal();
    };

    const categories = [
        { id: 'Rice', name: 'Rice' },
        { id: 'Wheat', name: 'Wheat' },
        { id: 'Corn', name: 'Corn' },
        { id: 'Soyabean', name: 'Soyabean' }
    ];

    const fetchListings = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        try {
            const response = await axios.get(APIURL + '/bdashboard/marketplace', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setData(response.data);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchListings();
    }, []);

    const filteredData = data.filter(item => {
        return (
            (selectedCategory === '' || item.croptype === selectedCategory) &&
            (selectedState === '' || item.fstate === selectedState)
        );
    });

    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <div className="flex">
                <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64">
                    <Sidebar />
                </div>

                <div className="ml-64 flex-1 p-8 mt-[64px] h-[calc(100vh-64px)] overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
                    <br></br>

                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
                            <Filter className="h-5 w-5 text-gray-400 mr-2" />
                            <select
                                className="bg-transparent border-none focus:ring-0 text-gray-600 pr-8"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                            <select
                                className="bg-transparent border-none focus:ring-0 text-gray-600 pr-8"
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                            >
                                <option value="">All States</option>
                                {statesAndUTs.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <Mitemcard key={item._id} item={item} openmodal={openModal} />
                        ))}
                    </div>

                    {isModalOpen && selectedCrop && (
                        <ExpressInterestModal
                            item={selectedCrop}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Marketplace;
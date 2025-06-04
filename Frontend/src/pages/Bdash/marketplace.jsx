import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Mitemcard from "./components/Mitemcard";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import { Filter, MapPin } from 'lucide-react';
import { statesAndUTs } from "../../data";
import { ExpressInterestModal } from "./components/Intmodal";
import FooterCmp from "./components/footer";


const Marketplace = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [favourites, setFavourites] = useState([]);
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

    const handleSubmit = async (listingId, price, femail, fname) => {
        const token = localStorage.getItem('token');
        const bemail = localStorage.getItem('email');
        if (!token || !bemail) {
            navigate('/login');
            return;
        };
        const isConfirmed = window.confirm("Are you sure you want to raise your interest in this crop?");
        if (!isConfirmed) return;

        try {
            await axios.post(`${APIURL}/bdashboard/bids/create`, {
                listingId, femail, price, bemail, fname
            }, {
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

    const fetchListings = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get(`${APIURL}/bdashboard/marketplace`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const listings = response.data.map(item => ({
                ...item,
                _id: item._id.toString()
            }));

            setData(listings);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchFavourites = async () => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        if (!email || !token) return;

        try {
            const res = await axios.post(`${APIURL}/bdashboard/marketplace/viewfav`, {
                bemail: email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const favIds = res.data.map(f => f.listingId?.toString());
            setFavourites(favIds);
        } catch (err) {
            console.error("Error fetching favourites", err);
        }
    };

    const toggleFavourite = async (itemId) => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        if (!email || !token) {
            navigate('/login');
            return;
        }

        const isFav = favourites.includes(itemId);
        const endpoint = `${APIURL}/bdashboard/marketplace/${isFav ? 'deletefav' : 'addfav'}`;

        try {
            await axios.post(endpoint, {
                bemail: email,
                listingId: itemId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setFavourites(prev =>
                isFav ? prev.filter(id => id !== itemId) : [...prev, itemId]
            );
        } catch (err) {
            console.error("Failed to toggle favourite", err);
        }
    };

    useEffect(() => {
        fetchListings();
        fetchFavourites();
    }, []);

    const categories = [
        { id: 'Rice', name: 'Rice' },
        { id: 'Wheat', name: 'Wheat' },
        { id: 'Corn', name: 'Corn' },
        { id: 'Soyabean', name: 'Soyabean' }
    ];

    const filteredData = data.filter(item =>
        (selectedCategory === '' || item.croptype === selectedCategory) &&
        (selectedState === '' || item.fstate === selectedState)
    );

    if (error) return <div className="text-red-600 text-center p-4">{JSON.stringify(error)}</div>;

    return (
  <div className="min-h-screen">
    {/* Header - fixed */}
    <div className="fixed top-0 left-0 w-full z-50">
      <Header />
    </div>

    {/* Sidebar - fixed */}
    <div className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] z-40 bg-white shadow">
      <Sidebar />
    </div>

    {/* Main content and footer - scrollable layout */}
    <div className="ml-64 pt-[64px]">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="bg-transparent border-none focus:ring-0 text-gray-600 pr-8"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <Mitemcard
              key={item._id}
              item={item}
              openmodal={openModal}
              isFavourited={favourites.includes(item._id)}
              toggleFavourite={toggleFavourite}
            />
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

      {/* Footer always below content */}
      <FooterCmp />
    </div>
  </div>
);

};

export default Marketplace;

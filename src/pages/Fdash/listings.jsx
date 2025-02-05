import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Listcard from './components/Listcard';
import { ListingModal } from './components/ListingModal';

const Listings = () => {
    const [data, setdata] = useState(null);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalFormData, setModalFormData] = useState({
        croptype: "",
        quantity: "",
        croppingtime: "",
        harvestingtime: "",
        endDate: "",
        price: "",
        fstate: "",
        fcity: "",
        fpincode: "",
        email: "",
    });
    const [modalIsLoading, setModalIsLoading] = useState(false);
    const [modalError, setModalError] = useState("");
    const navigate = useNavigate();
    const APIURL = import.meta.env.VITE_API;

    const fetchlistings = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/view', { email: email }, {
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
        fetchlistings();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalError("");
        setModalFormData({
            croptype: "",
            quantity: "",
            croppingtime: "",
            harvestingtime: "",
            endDate: "",
            price: "",
            fstate: "",
            fcity: "",
            fpincode: "",
            email: "",
        });
    };

    const handleModalSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        e.preventDefault();
        setModalIsLoading(true);
        setModalError("");

        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/addnew', modalFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setdata([...data, { ...modalFormData, id: data.length + 1 }]);
            closeModal();
        } catch (err) {
            setModalError("Failed to save listing. Please try again.");
        } finally {
            setModalIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) {
            return;
        };
        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/view/delete', { listingId: id, email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setdata(data.filter((item) => item._id !== id));
        } catch (err) {
            setError("Failed to delete listing. Please try again.");
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <div className="flex">
                {/* Fixed Sidebar */}
                <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 ml-64 mt-16 p-8 overflow-auto h-screen bg-gray-100">
                    <button
                        onClick={openModal}
                        className="cursor-pointer px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 mb-4"
                    >
                        Add new listing
                    </button>
                    <h1 className="text-3xl font-bold text-center mb-8">Listing Details</h1>
                    
                    {data && (
                        <div className="flex flex-wrap gap-4 justify-center">
                            {data.map((item) => (
                                <Listcard key={item._id} item={item} handleDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ListingModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                formData={modalFormData}
                setFormData={setModalFormData}
                isLoading={modalIsLoading}
                error={modalError}
            />
        </>
    );
};

export default Listings;

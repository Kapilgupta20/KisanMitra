import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Listcard from './components/Listcard';
import { AddListingModal } from './components/AddListingModal';
import Bidmodal from "./components/Bidmodal";

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
    const [isbidModalOpen, setbidModalOpen] = useState(false);
    const [selecteditem, setSelecteditem] = useState(null);
    const [selectedbid, setSelectedbid] = useState(null);
    const navigate = useNavigate();
    const APIURL = import.meta.env.VITE_API;

    const fetchlistings = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(APIURL + '/fdashboard/listings/view', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const listingsWithBids = await Promise.all(
                response.data.map(async (item) => {
                    const responseBids = await axios.post(APIURL + '/fdashboard/listings/view/bids', { listingId: item._id }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    return { ...item, bids: responseBids.data };
                })
            );
            setdata(listingsWithBids);
        } catch (err) {
            setError(err.message);
        }
    };


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

    const openbidmodal = (item, bid) => {
        setSelecteditem(item);
        setSelectedbid(bid);
        setbidModalOpen(true);
    }

    const onclosebid = () => {
        setSelecteditem(null);
        setbidModalOpen(false);
        setSelectedbid(null);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-100 p-8">
                    <button onClick={openModal}
                        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4">
                        Add new listing
                    </button>
                    <h1 className="text-3xl font-bold text-center mb-8">Listing Details</h1>
                    {data && (
                        <div className="flex flex-wrap justify-center">
                            {data.map((item) => (
                                <Listcard key={item._id} item={item} handleDelete={handleDelete} onselectbid={openbidmodal} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <AddListingModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                formData={modalFormData}
                setFormData={setModalFormData}
                isLoading={modalIsLoading}
                error={modalError}
            />

            <Bidmodal
                item={selecteditem}
                bid={selectedbid}
                isOpen={isbidModalOpen}
                onClose={onclosebid}
            />

        </>
    )
}

export default Listings;
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/SideBar';
import Listcard from "./components/Listcard";
import { ListingModal } from "./components/ListingModal";

const Listings = () => {
    const [data, setdata] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
    // const [editingListing, setEditingListing] = useState(false);

    const fetchlistings = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        };
        try {
            const response = await axios.post('http://localhost:8000/fdashboard/listings/view', { email: email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            // console.log(response.data);
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
        // setEditingListing(false);
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
            const response = await axios.post('http://localhost:8000/fdashboard/listings/addnew', modalFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setdata([...data, { ...modalFormData, id: data.length + 1 }]);
            closeModal();
            // fetchlistings();
        } catch (err) {
            setModalError("Failed to save listing. Please try again.");
        } finally {
            setModalIsLoading(false);
        }
    };

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
                                <Listcard key={item._id} item={item} />
                            ))}
                        </div>
                    )
                    }
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
                // editingListing={editingListing}
            />
        </>
    )
}

export default Listings;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/SideBar';

const BContracts = () => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const APIURL = import.meta.env.VITE_API;

    const fetchContracts = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(APIURL + '/bdashboard/contracts', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setContracts(response.data);
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        fetchContracts();
    }, []);

    const getContract = async (contractId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(APIURL + '/bdashboard/contracts/view', { contractId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `contract_${contractId}.pdf`; // Suggested filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'Ongoing':
                return 'bg-green-50 text-green-600';
            default:
                return 'bg-gray-50 text-gray-600';
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
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Contracts</h1>
                            <p className="text-gray-600">Manage and monitor your contracts</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl">
                                    <div className="p-4 border-b">
                                        <h2 className="text-lg font-semibold text-gray-900">Contracts</h2>
                                    </div>
                                    <div className="divide-y">
                                        {contracts.map((contract) => (
                                            <button
                                                key={contract._id}
                                                onClick={() => setSelectedContract(contract)}
                                                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer ${selectedContract?.id === contract.id ? 'bg-gray-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{contract.fname}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contract.status)}`}>
                                                        {contract.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">{contract.crop}</div>
                                                <div className="text-sm text-gray-600">
                                                    {contract.quantity} kgs at ₹{contract.price}/kg
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                {selectedContract ? (
                                    <div className="bg-white rounded-xl">
                                        <div className="p-6 border-b">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900">{selectedContract.fname}</h2>
                                                    <p className="text-gray-600">{selectedContract.crop}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="flex gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-50" onClick={() => getContract(selectedContract._id)}>
                                                        <Download />
                                                    </button>
                                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedContract.status)}`}>
                                                        {selectedContract.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Quantity:</span>
                                                    <span className="ml-2 font-medium text-gray-900">{selectedContract.quantity} kgs</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Price:</span>
                                                    <span className="ml-2 font-medium text-gray-900">₹{selectedContract.price}/kg</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Start Date:</span>
                                                    <span className="ml-2 font-medium text-gray-900">{new Date(selectedContract.startDate).toISOString().split('T')[0]}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">End Date:</span>
                                                    <span className="ml-2 font-medium text-gray-900">{selectedContract.endDate}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                                                <div className="font-medium text-gray-900 mb-2">Contract Terms</div>
                                                Deliver the crop by {selectedContract.endDate}
                                                <br></br>
                                                Payment within 30 days of delivery
                                            </div>


                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl p-6 text-center">
                                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Contract Selected</h3>
                                        <p className="text-gray-600">Select a contract from the list to view details</p>
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

export default BContracts;
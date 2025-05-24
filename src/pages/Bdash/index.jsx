// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import Header from "./components/Header";
// import Sidebar from "./components/SideBar";

// const Bdash = () => {
//   const [data, setdata] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const APIURL = import.meta.env.VITE_API;

//   const fetchbids = async () => {
//     const token = localStorage.getItem('token');
//     const email = localStorage.getItem('email');
//     if (!token || !email) {
//       navigate('/login');
//       return;
//     }
//     try {
//       const response = await axios.post(APIURL + '/bdashboard/bids/view', { email }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setdata(response.data);
//     } catch (err) {
//       setError(err);
//     }
//   }

//   useEffect(() => {
//     fetchbids();
//   }, []);

//   if (error) {
//     return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <Sidebar />
//       <h1>Buyer Dashboard</h1>
//       {data.map((item,index) => (
//         <div key={index}> {item.femail}, {item.price}, {item.status} </div>
//       ))};
//     </div>
//   );
// };

// export default Bdash;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Mitemcard from "./components/Mitemcard";
import { ExpressInterestModal } from "./components/Intmodal";

const Bdash = () => {
  const [bids, setBids] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchBids();
    fetchFavourites();
  }, []);

  const fetchBids = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token || !email) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(`${APIURL}/bdashboard/bids/view`, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setBids(response.data);
    } catch (err) {
      setError("Failed to load bids.");
    }
  };

  const fetchFavourites = async () => {
    const token = localStorage.getItem('token');
    const bemail = localStorage.getItem('email');
    try {
      const favIdsRes = await axios.post(`${APIURL}/bdashboard/marketplace/viewfav`, { bemail }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const listingIds = favIdsRes.data.map(item => item.listingId);
      setFavouriteIds(listingIds);

      if (listingIds.length > 0) {
        const listingsRes = await axios.post(`${APIURL}/bdashboard/viewfavitems`, { listingIds }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setFavourites(listingsRes.data);
      } else {
        setFavourites([]);
      }
    } catch (err) {
      setError("Failed to load favourites.");
    }
  };

  const toggleFavourite = async (itemId) => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email || !token) {
      navigate('/login');
      return;
    }

    const isFav = favouriteIds.includes(itemId);
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

      if (isFav) {
        setFavourites(prev => prev.filter(item => item._id !== itemId));
        setFavouriteIds(prev => prev.filter(id => id !== itemId));
      } else {
        // Refetch the new item to get its full details
        const res = await axios.post(`${APIURL}/viewfavitems`, { listingIds: [itemId] }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.length > 0) {
          setFavourites(prev => [...prev, res.data[0]]);
          setFavouriteIds(prev => [...prev, itemId]);
        }
      }
    } catch (err) {
      console.error("Failed to toggle favourite", err);
    }
  };


  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold mb-4">Raised Bids</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bids.length > 0 ? (
                bids.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <p><strong>Farmer Email:</strong> {item.femail}</p>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <p><strong>Status:</strong> {item.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No bids placed yet.</p>
              )}
            </div>
          </section>

          <section>
            <h1 className="text-2xl font-bold mb-4">Favourite Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favourites.length > 0 ? (
                favourites.map(item => (
                  <Mitemcard
                    key={item._id}
                    item={item}
                    openmodal={openModal}
                    isFavourited={favouriteIds.includes(item._id)}
                    toggleFavourite={toggleFavourite}
                  />
                ))
              ) : (
                <p className="text-gray-500">No favourite items found.</p>
              )}
            </div>

            {isModalOpen && selectedCrop && (
              <ExpressInterestModal
                item={selectedCrop}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Bdash;

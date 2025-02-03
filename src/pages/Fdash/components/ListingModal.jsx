import React, { useState } from "react";
import { X } from "lucide-react";

const statesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Delhi", "Puducherry", "Ladakh", "Lakshadweep", "Jammu and Kashmir"
];

const citiesByState = {
  "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Chandigarh", "Gurugram", "Faridabad"],
  "Himachal Pradesh": ["Shimla", "Manali", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Berhampur"],
  "Punjab": ["Chandigarh", "Amritsar", "Ludhiana"],
  "Rajasthan": ["Jaipur", "Udaipur", "Kota"],
  "Sikkim": ["Gangtok", "Pakyong", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttarakhand": ["Dehradun", "Nainital", "Haridwar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"],
  "Andaman and Nicobar Islands": ["Port Blair", "Havelock Island", "Diglipur"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy"],
  "Delhi": ["New Delhi", "Dwarka", "Lajpat Nagar"],
  "Puducherry": ["Puducherry", "Auroville", "Karai Kal"],
  "Ladakh": ["Leh", "Kargil", "Nubra Valley"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Leh"],
};

const monthOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const ListingModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isLoading,
  error,
}) => {
  // Local state for validation errors
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  // Determine available cities for the selected state
  const availableCities = formData.fstate ? citiesByState[formData.fstate] || [] : [];

  // Local handler that validates and augments form data before calling parent's onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // --- Basic Validations ---
    if (!formData.croptype.trim()) {
      setValidationError("Crop Type is required.");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      setValidationError("Quantity must be greater than 0.");
      return;
    }
    if (!formData.croppingtime) {
      setValidationError("Please select a cropping month.");
      return;
    }
    if (!formData.harvestingtime) {
      setValidationError("Please select a harvesting month.");
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setValidationError("Price must be greater than 0.");
      return;
    }
    if (!formData.fstate) {
      setValidationError("Please select a state.");
      return;
    }
    if (!formData.fcity) {
      setValidationError("Please select a city.");
      return;
    }
    if (!formData.fpincode) {
      setValidationError("Pincode is required.");
      return;
    }

    // Automatically set email from local storage
    const emailFromLS = localStorage.getItem("email") || "";
    // Map the harvesting month to a month number
    const monthMap = {
      "January": "01",
      "February": "02",
      "March": "03",
      "April": "04",
      "May": "05",
      "June": "06",
      "July": "07",
      "August": "08",
      "September": "09",
      "October": "10",
      "November": "11",
      "December": "12"
    };
    const monthNumber = monthMap[formData.harvestingtime];
    const currentYear = new Date().getFullYear();
    const endDate = `${currentYear}-${monthNumber}-28`;

    // Update the form data with email and computed endDate.
    // (If your onSubmit handler depends on formData, ensure that it picks up these values.)
    setFormData({ ...formData, email: emailFromLS, endDate });

    // Clear validation error and then call the parent's onSubmit handler.
    setValidationError("");
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-md transition-opacity">
      <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Listing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* Display validation or API errors */}
        {(validationError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {validationError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Crop Type</label>
            <input
              type="text"
              value={formData.croptype}
              onChange={(e) =>
                setFormData({ ...formData, croptype: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter crop name"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter quantity(in kgs)"
            />
          </div>

          {/* Cropping Time Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cropping Time</label>
            <select
              value={formData.croppingtime}
              onChange={(e) =>
                setFormData({ ...formData, croppingtime: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Cropping Month</option>
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Harvesting Time Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Harvesting Time</label>
            <select
              value={formData.harvestingtime}
              onChange={(e) =>
                setFormData({ ...formData, harvestingtime: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Harvesting Month</option>
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter price(per kg)"
            />
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              value={formData.fstate}
              onChange={(e) =>
                // Reset city when state changes
                setFormData({ ...formData, fstate: e.target.value, fcity: "" })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select State</option>
              {statesAndUTs.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <select
              value={formData.fcity}
              onChange={(e) =>
                setFormData({ ...formData, fcity: e.target.value })
              }
              disabled={!formData.fstate || availableCities.length === 0}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">
                {!formData.fstate ? "Select a state first" : "Select City"}
              </option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              value={formData.fpincode}
              onChange={(e) =>
                setFormData({ ...formData, fpincode: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your pincode"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

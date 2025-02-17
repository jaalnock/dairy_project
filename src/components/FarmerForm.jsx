import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FarmerForm = ({
  isEditing,
  handleSaveFarmer,
  setIsFormOpen,
  editingFarmer,
}) => {
  const [formData, setFormData] = useState({
    farmerName: "",
    mobileNumber: "",
    milkType: "",
    address: "",
    gender: "",
    joiningDate: new Date().toISOString().split("T")[0], // Default to today's date
  });

  useEffect(() => {
    if (isEditing && editingFarmer) {
      // Ensure that the joiningDate is in YYYY-MM-DD format if needed
      setFormData(editingFarmer);
    }
  }, [isEditing, editingFarmer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (
      !formData.farmerName ||
      !formData.mobileNumber ||
      !formData.milkType ||
      !formData.address ||
      !formData.gender
    ) {
      alert("Please fill all fields!");
      return;
    }
    handleSaveFarmer(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg relative"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            {isEditing ? "Edit Farmer" : "New Farmer"}
          </h3>
          <button
            onClick={() => setIsFormOpen(false)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close form"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <form className="px-6 py-4 space-y-5">
          <div>
            <label
              htmlFor="farmerName"
              className="block text-sm font-medium text-gray-700"
            >
              Farmer Name
            </label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              placeholder="Enter farmer name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="milkType"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Milk
            </label>
            <select
              id="milkType"
              name="milkType"
              value={formData.milkType}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Cow">Cow</option>
              <option value="Buffalo">Buffalo</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="joiningDate"
              className="block text-sm font-medium text-gray-700"
            >
              Joining Date
            </label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Modal Actions */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md transition duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          >
            {isEditing ? "Update" : "Save"} Farmer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerForm;

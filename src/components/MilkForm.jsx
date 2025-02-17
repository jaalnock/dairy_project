import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MilkForm = ({
  isEditing,
  handleSaveMilkEntry,
  setIsFormOpen,
  editingEntry,
  farmers = [],
}) => {
  const initialFormData = {
    farmerNumber: "",
    transactionDate: new Date().toISOString().split("T")[0],
    milkType: "",
    milkQuantity: "",
    pricePerLitre: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && editingEntry) {
      const {
        farmerNumber,
        transactionDate,
        milkType,
        milkQuantity,
        pricePerLitre,
      } = editingEntry;
      setFormData({
        farmerNumber: farmerNumber || "",
        transactionDate: transactionDate
          ? new Date(transactionDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        milkType: milkType || "",
        milkQuantity: milkQuantity || "",
        pricePerLitre: pricePerLitre || "",
      });
    }
  }, [isEditing, editingEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.farmerNumber) {
      newErrors.farmerNumber = "Please select a farmer.";
    }
    if (!formData.transactionDate) {
      newErrors.transactionDate = "Transaction date is required.";
    }
    if (!formData.milkType) {
      newErrors.milkType = "Please select a milk type.";
    }
    if (!formData.milkQuantity) {
      newErrors.milkQuantity = "Milk quantity is required.";
    } else if (parseFloat(formData.milkQuantity) <= 0) {
      newErrors.milkQuantity = "Milk quantity must be greater than 0.";
    }
    if (!formData.pricePerLitre) {
      newErrors.pricePerLitre = "Price per litre is required.";
    } else if (parseFloat(formData.pricePerLitre) <= 0) {
      newErrors.pricePerLitre = "Price per litre must be greater than 0.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleSaveMilkEntry(formData);
    setIsFormOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 overflow-y-auto z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="milk-form-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg relative"
      >
        {/* Close Icon */}
        <button
          onClick={() => setIsFormOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          aria-label="Close Milk Form"
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

        <h3
          id="milk-form-title"
          className="text-2xl font-bold text-gray-800 text-center mb-6"
        >
          {isEditing ? "Edit Milk Entry" : "New Milk Entry"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Farmer Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer
            </label>
            <select
              name="farmerNumber"
              value={formData.farmerNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.farmerNumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              <option value="">Select Farmer</option>
              {farmers.map((farmer) => (
                <option key={farmer._id} value={farmer.mobileNumber}>
                  {farmer.farmerName} ({farmer.mobileNumber})
                </option>
              ))}
            </select>
            {errors.farmerNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.farmerNumber}</p>
            )}
          </div>

          {/* Transaction Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.transactionDate ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.transactionDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.transactionDate}
              </p>
            )}
          </div>

          {/* Milk Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Milk Type
            </label>
            <select
              name="milkType"
              value={formData.milkType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.milkType ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              <option value="">Select type</option>
              <option value="Cow">Cow</option>
              <option value="Buffalo">Buffalo</option>
            </select>
            {errors.milkType && (
              <p className="text-red-500 text-xs mt-1">{errors.milkType}</p>
            )}
          </div>

          {/* Milk Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Milk Quantity (Liters)
            </label>
            <input
              type="number"
              name="milkQuantity"
              value={formData.milkQuantity}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.milkQuantity ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.milkQuantity && (
              <p className="text-red-500 text-xs mt-1">{errors.milkQuantity}</p>
            )}
          </div>

          {/* Price Per Litre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Per Litre (₹)
            </label>
            <input
              type="number"
              name="pricePerLitre"
              value={formData.pricePerLitre}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.pricePerLitre ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.pricePerLitre && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pricePerLitre}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 space-x-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#2c447f] hover:bg-[#1b2d5b] text-white px-4 py-2 rounded-lg transition duration-200 focus:outline-none"
            >
              {isEditing ? "Update" : "Save"} Milk Entry
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MilkForm;

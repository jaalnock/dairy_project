import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoanForm = ({
  isEditing,
  handleSaveLoan,
  setIsFormOpen,
  editingLoan,
}) => {
  const initialFormData = {
    farmerName: "",
    phoneNumber: "",
    dueAmount: "",
    transactionDate: new Date().toISOString().split("T")[0], // Default to today
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && editingLoan) {
      setFormData({
        farmerName: editingLoan.farmerName,
        phoneNumber: editingLoan.phoneNumber,
        dueAmount: editingLoan.dueAmount,
        transactionDate:
          editingLoan.transactionDate || new Date().toISOString().split("T")[0],
      });
    }
  }, [isEditing, editingLoan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the specific field when the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.farmerName.trim()) {
      newErrors.farmerName = "Farmer name is required.";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }
    if (!formData.dueAmount || parseFloat(formData.dueAmount) <= 0) {
      newErrors.dueAmount = "Due amount must be a positive number.";
    }
    if (!formData.transactionDate) {
      newErrors.transactionDate = "Transaction date is required.";
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
    handleSaveLoan(formData);
    setIsFormOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 overflow-y-auto z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loan-form-title"
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
          aria-label="Close Loan Form"
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
          id="loan-form-title"
          className="text-2xl font-bold text-gray-800 text-center mb-6"
        >
          {isEditing ? "Edit Loan Record" : "New Loan Record"}
        </h3>

        {/* Inline Error Summary (optional) */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4">
            <ul className="list-disc list-inside text-red-600 text-sm">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="farmerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Farmer Name
            </label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.farmerName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.farmerName && (
              <p className="text-red-500 text-xs mt-1">{errors.farmerName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength="10"
              className={`w-full px-4 py-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dueAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Amount ($)
            </label>
            <input
              type="number"
              id="dueAmount"
              name="dueAmount"
              value={formData.dueAmount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.dueAmount ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.dueAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.dueAmount}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="transactionDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Transaction Date
            </label>
            <input
              type="date"
              id="transactionDate"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.transactionDate ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.transactionDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.transactionDate}
              </p>
            )}
          </div>

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
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 focus:outline-none"
            >
              {isEditing ? "Update" : "Save"} Loan
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoanForm;

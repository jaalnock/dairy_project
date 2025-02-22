import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const LoanForm = ({
  setIsFormOpen,
  handleSaveLoan,
  isEditing,
  editingLoan,
}) => {
  const initialFormData = {
    mobileNumber: "",
    loanAmount: "",
    loanDate: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [farmers, setFarmers] = useState([]);

  // When editing, prefill the form with the provided loan values.
  // Ensure each field is defined so that inputs remain controlled.
  useEffect(() => {
    if (isEditing && editingLoan) {
      setFormData({
        mobileNumber: editingLoan.mobileNumber || "",
        loanAmount: editingLoan.loanAmount || "",
        // If a loanDate exists, split off the time portion; otherwise, use today's date.
        loanDate: editingLoan.loanDate
          ? editingLoan.loanDate.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditing, editingLoan]);

  // Fetch the list of farmers from the backend
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/farmer/get-all-farmers",
          { withCredentials: true }
        );
        const fetchedFarmers = response.data.data || response.data;
        setFarmers(fetchedFarmers);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchFarmers();
  }, []);

  // Update the form data and clear errors for the changed field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate the form data
  const validate = () => {
    const newErrors = {};
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Please select a farmer.";
    }
    if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0) {
      newErrors.loanAmount = "Loan amount must be a positive number.";
    }
    if (!formData.loanDate) {
      newErrors.loanDate = "Loan date is required.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await handleSaveLoan(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving loan:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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

        {Object.keys(errors).length > 0 && (
          <div className="mb-4">
            <ul className="list-disc list-inside text-red-600 text-sm">
              {Object.values(errors).map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Farmer
            </label>
            <select
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.mobileNumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">-- Select Farmer --</option>
              {farmers.map((farmer) => (
                <option key={farmer._id} value={farmer.mobileNumber}>
                  {farmer.farmerName} ({farmer.mobileNumber})
                </option>
              ))}
            </select>
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Loan Amount ($)
            </label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.loanAmount ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.loanAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="loanDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Loan Date
            </label>
            <input
              type="date"
              id="loanDate"
              name="loanDate"
              value={formData.loanDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.loanDate ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.loanDate && (
              <p className="text-red-500 text-xs mt-1">{errors.loanDate}</p>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 focus:outline-none"
            >
              {isEditing ? "Update Loan" : "Save Loan"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoanForm;

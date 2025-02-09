import React, { useState, useEffect } from "react";

const LoanForm = ({ isEditing, handleSaveLoan, setIsFormOpen, editingLoan }) => {
  const [formData, setFormData] = useState({
    farmerName: "",
    phoneNumber: "",
    dueAmount: "",
    transactionDate: new Date().toISOString().split("T")[0], // Default to today
  });

  useEffect(() => {
    if (isEditing && editingLoan) {
      setFormData({
        farmerName: editingLoan.farmerName,
        phoneNumber: editingLoan.phoneNumber,
        dueAmount: editingLoan.dueAmount,
        transactionDate: editingLoan.transactionDate || new Date().toISOString().split("T")[0],
      });
    }
  }, [isEditing, editingLoan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.farmerName.trim()) {
      alert("Farmer name is required.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    if (!formData.dueAmount || parseFloat(formData.dueAmount) <= 0) {
      alert("Due amount must be a positive number.");
      return;
    }
    if (!formData.transactionDate) {
      alert("Transaction date is required.");
      return;
    }

    handleSaveLoan(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Loan Record" : "New Loan Record"}
        </h3>

        <label className="block mb-1">Farmer Name</label>
        <input
          type="text"
          name="farmerName"
          value={formData.farmerName}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          maxLength="10"
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-1">Due Amount ($)</label>
        <input
          type="number"
          name="dueAmount"
          value={formData.dueAmount}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-1">Transaction Date</label>
        <input
          type="date"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="mt-4 flex justify-between space-x-4">
          <button
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? "Update" : "Save"} Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;

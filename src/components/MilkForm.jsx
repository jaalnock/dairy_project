import React, { useState, useEffect } from "react";

const MilkForm = ({
  isEditing,
  handleSaveMilkEntry,
  setIsFormOpen,
  editingEntry,
  farmers = [],
}) => {
  const [formData, setFormData] = useState({
    farmerNumber: "",
    transactionDate: new Date().toISOString().split("T")[0],
    milkType: "",
    milkQuantity: "",
    pricePerLitre: "",
  });

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.farmerNumber ||
      !formData.transactionDate ||
      !formData.milkType ||
      !formData.milkQuantity ||
      !formData.pricePerLitre
    ) {
      alert("Please fill all required fields!");
      return;
    }
    handleSaveMilkEntry(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Milk Entry" : "New Milk Entry"}
        </h3>

        <label className="block mb-2">Farmer</label>
        <select
          name="farmerNumber"
          value={formData.farmerNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Farmer</option>
          {farmers.map((farmer) => (
            <option key={farmer._id} value={farmer.mobileNumber}>
              {farmer.farmerName} ({farmer.mobileNumber})
            </option>
          ))}
        </select>

        <label className="block mt-2">Transaction Date</label>
        <input
          type="date"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <label className="block mt-2">Milk Type</label>
        <select
          name="milkType"
          value={formData.milkType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select type</option>
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option>
        </select>

        <label className="block mt-2">Milk Quantity (Liters)</label>
        <input
          type="number"
          name="milkQuantity"
          value={formData.milkQuantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <label className="block mt-2">Price Per Litre (₹)</label>
        <input
          type="number"
          name="pricePerLitre"
          value={formData.pricePerLitre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="mt-4 flex justify-between space-x-4">
          <button
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg hover:bg-[#1b2d5b] transition"
          >
            {isEditing ? "Update" : "Save"} Milk Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilkForm;

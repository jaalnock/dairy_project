import React, { useState, useEffect } from "react";

const MilkForm = ({ isEditing, handleSaveMilkEntry, setIsFormOpen, editingEntry }) => {
  const [formData, setFormData] = useState({
    farmerName: "",
    milkType: "",
    quantity: "",
    fat: "",
    snf: "",
    price: "",
  });

  useEffect(() => {
    if (isEditing && editingEntry) {
      setFormData(editingEntry);
    }
  }, [isEditing, editingEntry]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = () => {
    if (!formData.farmerName || !formData.milkType || !formData.quantity) {
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

        <label className="block mb-2">Farmer Name</label>
        <input
          type="text"
          name="farmerName"
          value={formData.farmerName}
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

        <label className="block mt-2">Quantity (Liters)</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border p-2 rounded" required />

        <label className="block mt-2">Fat (%)</label>
        <input type="number" name="fat" value={formData.fat} onChange={handleChange} className="w-full border p-2 rounded" />

        <label className="block mt-2">SNF (%)</label>
        <input type="number" name="snf" value={formData.snf} onChange={handleChange} className="w-full border p-2 rounded" />

        <label className="block mt-2">Price (₹)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />

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
            {isEditing ? "Update" : "Save"} Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilkForm;

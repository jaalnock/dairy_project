import React, { useState, useEffect } from "react";

const FarmerForm = ({ isEditing, handleSaveFarmer, setIsFormOpen, editingFarmer }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    milkType: "",
    address: "",
    gender: "",
    joiningDate: new Date().toISOString().split("T")[0], // Default to today's date
  });

  useEffect(() => {
    if (isEditing && editingFarmer) {
      setFormData(editingFarmer);
    }
  }, [isEditing, editingFarmer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.milkType || !formData.address || !formData.gender) {
      alert("Please fill all fields!");
      return;
    }
    handleSaveFarmer(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Farmer" : "New Farmer"}
        </h3>

        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />

        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />

        <label className="block mb-1">Type of Milk</label>
        <select
          name="milkType"
          value={formData.milkType}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="">Select Type</option>
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option>
        </select>

        <label className="block mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />

        <label className="block mb-1">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block mb-1">Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
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
            {isEditing ? "Update" : "Save"} Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerForm;

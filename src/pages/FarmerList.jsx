import React, { useState, useEffect } from "react";
import FarmerForm from "../components/FarmerForm.jsx";
import { v4 as uuidv4 } from "uuid";

const FarmerList = () => {
  const [farmers, setFarmers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedFarmers = JSON.parse(localStorage.getItem("farmers")) || [];
    setFarmers(storedFarmers);
  }, []);

  useEffect(() => {
    localStorage.setItem("farmers", JSON.stringify(farmers));
  }, [farmers]);

  const handleSaveFarmer = (farmer) => {
    if (editingFarmer) {
      const updatedFarmers = farmers.map((f) =>
        f.id === editingFarmer.id ? { ...f, ...farmer } : f
      );
      setFarmers(updatedFarmers);
      setEditingFarmer(null);
    } else {
      const newFarmer = { id: uuidv4(), ...farmer };
      setFarmers([...farmers, newFarmer]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (farmer) => {
    setEditingFarmer(farmer);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    const updatedFarmers = farmers.filter((f) => f.id !== id);
    setFarmers(updatedFarmers);
  };

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.phone.includes(searchQuery)
  );

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#2c447f]">
        Farmers List
      </h2>
      
      <input
        type="text"
        placeholder="Search by name or phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Type of Milk</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Joining Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFarmers.length > 0 ? (
            filteredFarmers.map((farmer) => (
              <tr key={farmer.id} className="text-center">
                <td className="border p-2">{farmer.name}</td>
                <td className="border p-2">{farmer.phone}</td>
                <td className="border p-2">{farmer.milkType}</td>
                <td className="border p-2">{farmer.address}</td>
                <td className="border p-2">{farmer.gender}</td>
                <td className="border p-2">{farmer.joiningDate}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(farmer)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(farmer.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-4 text-center text-gray-500">
                No farmers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditingFarmer(null);
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        + Add Farmer
      </button>

      {isFormOpen && (
        <FarmerForm
          isEditing={!!editingFarmer}
          handleSaveFarmer={handleSaveFarmer}
          setIsFormOpen={setIsFormOpen}
          editingFarmer={editingFarmer}
        />
      )}
    </div>
  );
};

export default FarmerList;
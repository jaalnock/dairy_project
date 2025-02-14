import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerForm from "../components/FarmerForm.jsx";

const FarmerList = () => {
  const [farmers, setFarmers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch farmers from the backend API on mount
  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/farmer/get-all-farmers",
          { withCredentials: true }
        );
        console.log(response);

        // Assume the API returns { data: [farmer1, farmer2, ...] } or simply an array.
        const fetchedFarmers = response.data.data || response.data;
        setFarmers(fetchedFarmers);
        setError(null);
      } catch (err) {
        console.error("Error fetching farmers:", err);
        setError("Error fetching farmers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  // Automatically clear error messages after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Save (add or update) a farmer via API
  const handleSaveFarmer = async (farmer) => {
    try {
      if (editingFarmer) {
        // Update existing farmer (PUT request)
        const response = await axios.patch(
          `http://localhost:8000/api/v1/farmer/update/${editingFarmer._id}`,
          farmer,
          { withCredentials: true }
        );
        const updatedFarmer = response.data.data || response.data;
        setFarmers((prevFarmers) =>
          prevFarmers.map((f) =>
            f._id === editingFarmer._id ? updatedFarmer : f
          )
        );
        setEditingFarmer(null);
      } else {
        // Add new farmer (POST request)
        const response = await axios.post(
          "http://localhost:8000/api/v1/farmer/addFarmer",
          farmer,
          { withCredentials: true }
        );
        console.log(response);

        const newFarmer = response.data.data || response.data;
        setFarmers((prevFarmers) => [...prevFarmers, newFarmer]);
      }
      setIsFormOpen(false);
      setError(null);
    } catch (err) {
      console.log(err.response.status);

      if (err.request.status === 409) {
        setError("Farmer already exists");
      }
      if (err.request.status === 400) {
        setError("Please fill all fields");
      }
      console.error("Error saving farmer:", err);
    }
  };

  // Open the form for editing a farmer
  const handleEdit = (farmer) => {
    setEditingFarmer(farmer);
    setIsFormOpen(true);
  };

  // Delete a farmer via API
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this farmer?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/farmer/delete/${id}`, {
        withCredentials: true,
      });
      setFarmers((prevFarmers) => prevFarmers.filter((f) => f._id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting farmer:", err);
      setError(
        err.response?.data?.message ||
          "Error deleting farmer. Please try again later."
      );
    }
  };

  // Filter farmers based on search query
  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.mobileNumber.includes(searchQuery)
  );

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#2c447f]">
        Farmers List
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Search by name or phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {loading ? (
        <div>Loading farmers...</div>
      ) : (
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
                <tr key={farmer._id} className="text-center">
                  <td className="border p-2">{farmer.farmerName}</td>
                  <td className="border p-2">{farmer.mobileNumber}</td>
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
                      onClick={() => handleDelete(farmer._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border p-4 text-center text-gray-500"
                >
                  No farmers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

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

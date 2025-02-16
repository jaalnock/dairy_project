import React, { useState, useEffect } from "react";
import axios from "axios";
import MilkForm from "../components/MilkForm.jsx";

const MilkList = () => {
  const [milkEntries, setMilkEntries] = useState([]); // Array of farmer documents (each contains transactions)
  const [farmers, setFarmers] = useState([]); // For populating the MilkForm dropdown
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null); // A flattened transaction object
  const [error, setError] = useState(null);
  const [loadingMilk, setLoadingMilk] = useState(false);
  const [loadingFarmers, setLoadingFarmers] = useState(false);

  // Fetch milk entries (farmers with transactions) from the backend
  const fetchMilkEntries = async () => {
    setLoadingMilk(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/milk/get-all-milk",
        {
          withCredentials: true,
        }
      );
      // Expected response: array of farmer objects with fields: farmerName, mobileNumber, transaction (array)
      const fetchedEntries = response.data.data || response.data;
      console.log("Fetched milk entries:", fetchedEntries);
      setMilkEntries(fetchedEntries);
      setError(null);
    } catch (err) {
      console.error("Error fetching milk entries:", err);
      setError("Error fetching milk entries. Please try again later.");
    } finally {
      setLoadingMilk(false);
    }
  };

  // Fetch farmers for the dropdown in MilkForm
  const fetchFarmers = async () => {
    setLoadingFarmers(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/farmer/get-all-farmers",
        {
          withCredentials: true,
        }
      );
      const fetchedFarmers = response.data.data || response.data;
      setFarmers(fetchedFarmers);
    } catch (err) {
      console.error("Error fetching farmers:", err);
    } finally {
      setLoadingFarmers(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchMilkEntries();
    fetchFarmers();
  }, []);

  // Automatically clear error messages after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Optimistically update local state when saving a milk transaction
  const handleSaveMilkEntry = async (entry) => {
    try {
      if (editingEntry) {
        // Update existing milk transaction
        const response = await axios.patch(
          `http://localhost:8000/api/v1/milk/update-milk/${editingEntry.farmerNumber}/${editingEntry._id}`,
          entry,
          { withCredentials: true }
        );
        console.log("Update response:", response);
        // The response returns an updated farmer document.
        const updatedFarmer = response.data.data;
        // Update the farmer's transactions in local state:
        setMilkEntries((prevEntries) =>
          prevEntries.map((farmer) => {
            if (farmer.mobileNumber === editingEntry.farmerNumber) {
              return { ...farmer, transaction: updatedFarmer.transaction };
            }
            return farmer;
          })
        );
        setEditingEntry(null);
      } else {
        // Add new milk transaction
        const response = await axios.post(
          "http://localhost:8000/api/v1/milk/add-milk",
          entry,
          { withCredentials: true }
        );
        console.log("Add response:", response);
        const updatedFarmer = response.data.data;
        // Update local state: if the farmer exists, update their transactions; otherwise, add the new farmer
        setMilkEntries((prevEntries) => {
          const index = prevEntries.findIndex(
            (farmer) => farmer.mobileNumber === updatedFarmer.mobileNumber
          );
          if (index !== -1) {
            const newEntries = [...prevEntries];
            newEntries[index] = updatedFarmer;
            return newEntries;
          } else {
            return [...prevEntries, updatedFarmer];
          }
        });
      }
      setIsFormOpen(false);
      setError(null);
    } catch (err) {
      console.error("Error saving milk transaction:", err);
      setError(
        err.response?.data?.message ||
          "Error saving milk entry. Please try again."
      );
    }
  };

  // Open the form for editing a flattened milk transaction
  const handleEdit = (flatEntry) => {
    setEditingEntry(flatEntry);
    setIsFormOpen(true);
  };

  // Delete a milk transaction with optimistic local update
  const handleDelete = async (transactionId, farmerNumber) => {
    if (
      !window.confirm("Are you sure you want to delete this milk transaction?")
    )
      return;
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/milk/delete-milk/${farmerNumber}/${transactionId}`,
        { withCredentials: true }
      );
      // Update local state: remove the transaction from the corresponding farmer
      setMilkEntries((prevEntries) =>
        prevEntries.map((farmer) => {
          if (farmer.mobileNumber === farmerNumber) {
            return {
              ...farmer,
              transaction: farmer.transaction.filter(
                (txn) => txn._id !== transactionId
              ),
            };
          }
          return farmer;
        })
      );
      setError(null);
    } catch (err) {
      console.error("Error deleting milk transaction:", err);
      setError(
        err.response?.data?.message ||
          "Error deleting milk transaction. Please try again later."
      );
    }
  };

  // Flatten the nested milkEntries into individual transaction rows.
  // Each farmer document is expected to have: { farmerName, mobileNumber, transaction: [...] }
  const flatMilkTransactions = milkEntries.flatMap((entry) =>
    entry.transaction.map((txn) => ({
      _id: txn._id,
      farmerName: entry.farmerName,
      farmerNumber: entry.mobileNumber, // For update/delete endpoints
      transactionDate: txn.transactionDate,
      milkType: txn.milkType,
      milkQuantity: txn.milkQuantity,
      transactionAmount: txn.transactionAmount,
    }))
  );

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        Milk Collection List
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loadingMilk ? (
        <div>Loading milk entries...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Farmer Name</th>
              <th className="border p-2">Transaction Date</th>
              <th className="border p-2">Milk Type</th>
              <th className="border p-2">Milk Quantity (Liters)</th>
              <th className="border p-2">Transaction Amount (₹)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flatMilkTransactions.length > 0 ? (
              flatMilkTransactions.map((flatEntry) => (
                <tr key={flatEntry._id} className="text-center">
                  <td className="border p-2">{flatEntry.farmerName}</td>
                  <td className="border p-2">
                    {new Date(flatEntry.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{flatEntry.milkType}</td>
                  <td className="border p-2">{flatEntry.milkQuantity}</td>
                  <td className="border p-2">₹{flatEntry.transactionAmount}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(flatEntry)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(flatEntry._id, flatEntry.farmerNumber)
                      }
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
                  colSpan="6"
                  className="border p-4 text-center text-gray-500"
                >
                  No milk collections available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditingEntry(null);
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        + Add Milk Entry
      </button>

      {isFormOpen && (
        <MilkForm
          isEditing={!!editingEntry}
          handleSaveMilkEntry={handleSaveMilkEntry}
          setIsFormOpen={setIsFormOpen}
          editingEntry={editingEntry}
          farmers={farmers} // Passing farmers to MilkForm for dropdown
        />
      )}
    </div>
  );
};

export default MilkList;

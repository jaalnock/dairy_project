import React, { useState, useEffect } from "react";
import MilkForm from "../components/MilkForm.jsx";
import { v4 as uuidv4 } from "uuid";

const MilkList = () => {
  const [milkEntries, setMilkEntries] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Load milk entries from localStorage on mount
  useEffect(() => {
    const storedMilkEntries = JSON.parse(localStorage.getItem("milkEntries")) || [];
    setMilkEntries(storedMilkEntries);
  }, []);

  // Store milk entries in localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("milkEntries", JSON.stringify(milkEntries));
  }, [milkEntries]);

  // Save new or updated milk entry
  const handleSaveMilkEntry = (entry) => {
    if (editingEntry) {
      // Update existing entry
      const updatedEntries = milkEntries.map((m) =>
        m.id === editingEntry.id ? { ...m, ...entry } : m
      );
      setMilkEntries(updatedEntries);
      setEditingEntry(null);
    } else {
      // Save new entry with a unique ID and automatic date
      const newEntry = { id: uuidv4(), date: new Date().toLocaleDateString(), ...entry };
      setMilkEntries([...milkEntries, newEntry]);
    }
    setIsFormOpen(false);
  };

  // Handle Edit
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const filteredEntries = milkEntries.filter((m) => m.id !== id);
    setMilkEntries(filteredEntries);
  };

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">Milk Collection List</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Farmer Name</th>
            <th className="border p-2">Milk Type</th>
            <th className="border p-2">Quantity (Liters)</th>
            <th className="border p-2">Fat (%)</th>
            <th className="border p-2">SNF (%)</th>
            <th className="border p-2">Price (₹)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {milkEntries.length > 0 ? (
            milkEntries.map((entry) => (
              <tr key={entry.id} className="text-center">
                <td className="border p-2">{entry.date}</td>
                <td className="border p-2">{entry.farmerName}</td>
                <td className="border p-2">{entry.milkType}</td>
                <td className="border p-2">{entry.quantity}</td>
                <td className="border p-2">{entry.fat}</td>
                <td className="border p-2">{entry.snf}</td>
                <td className="border p-2">₹{entry.price}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border p-4 text-center text-gray-500">
                No milk collections available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
        />
      )}
    </div>
  );
};

export default MilkList;

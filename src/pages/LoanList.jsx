import React, { useState, useEffect } from "react";
import LoanForm from "../components/LoanForm.jsx";
import { v4 as uuidv4 } from "uuid";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoans(storedLoans);
  }, []);

  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loans));
  }, [loans]);

  const handleSaveLoan = (loan) => {
    if (editingLoan) {
      const updatedLoans = loans.map((l) =>
        l.id === editingLoan.id ? { ...l, ...loan } : l
      );
      setLoans(updatedLoans);
      setEditingLoan(null);
    } else {
      const newLoan = { id: uuidv4(), ...loan };
      setLoans([...loans, newLoan]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (loan) => {
    setEditingLoan(loan);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    const filteredLoans = loans.filter((l) => l.id !== id);
    setLoans(filteredLoans);
  };

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        Loan Records
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Farmer Name</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Due Amount ($)</th>
            <th className="border p-2">Transaction Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <tr key={loan.id} className="text-center">
                <td className="border p-2">{loan.farmerName}</td>
                <td className="border p-2">{loan.phoneNumber}</td>
                <td className="border p-2">${loan.dueAmount}</td>
                <td className="border p-2">{loan.transactionDate}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(loan)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loan.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-4 text-center text-gray-500">
                No loan records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditingLoan(null);
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        + Add Loan
      </button>

      {isFormOpen && (
        <LoanForm
          isEditing={!!editingLoan}
          handleSaveLoan={handleSaveLoan}
          setIsFormOpen={setIsFormOpen}
          editingLoan={editingLoan}
        />
      )}
    </div>
  );
};

export default LoanList;

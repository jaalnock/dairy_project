import React, { useState, useEffect } from "react";
import LoanForm from "../components/LoanForm.jsx";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);

  // Fetch stored loans from localStorage on mount
  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoans(storedLoans);
  }, []);

  // Persist loans to localStorage when they change
  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loans));
  }, [loans]);

  // Save (add or update) a loan record
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

  // Open the form for editing a loan
  const handleEdit = (loan) => {
    setEditingLoan(loan);
    setIsFormOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (loan) => {
    setLoanToDelete(loan);
    setIsDeleteModalOpen(true);
  };

  // Delete a loan record after confirmation
  const handleDeleteConfirmed = (id) => {
    const filteredLoans = loans.filter((l) => l.id !== id);
    setLoans(filteredLoans);
    setIsDeleteModalOpen(false);
    setLoanToDelete(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        Loan Records
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Farmer Name</th>
              <th className="px-4 py-3 text-left">Phone Number</th>
              <th className="px-4 py-3 text-left">Due Amount ($)</th>
              <th className="px-4 py-3 text-left">Transaction Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.length > 0 ? (
              loans.map((loan, idx) => (
                <AnimatePresence key={loan.id}>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-3">{loan.farmerName}</td>
                    <td className="px-4 py-3">{loan.phoneNumber}</td>
                    <td className="px-4 py-3">${loan.dueAmount}</td>
                    <td className="px-4 py-3">{loan.transactionDate}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEdit(loan)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded mr-2 transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        aria-label={`Edit loan for ${loan.farmerName}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(loan)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label={`Delete loan for ${loan.farmerName}`}
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                </AnimatePresence>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No loan records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Add Loan Button */}
      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditingLoan(null);
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Add new loan"
      >
        + Add Loan
      </button>

      {/* Loan Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50"
            aria-modal="true"
            role="dialog"
          >
            <LoanForm
              isEditing={!!editingLoan}
              handleSaveLoan={handleSaveLoan}
              setIsFormOpen={setIsFormOpen}
              editingLoan={editingLoan}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && loanToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
            >
              <h3 className="text-xl font-semibold text-center mb-4">
                Confirm Delete
              </h3>
              <p className="text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-bold">{loanToDelete.farmerName}</span>'s
                loan record?
              </p>
              <div className="flex justify-around">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteConfirmed(loanToDelete.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoanList;

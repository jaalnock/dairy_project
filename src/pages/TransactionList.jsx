import React, { useState, useEffect } from "react";
import { TransactionForm } from "../components/TransactionForm.jsx";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

// Predefined products for dropdown in the TransactionForm
const predefinedProducts = [
  { id: "p1", name: "Product A", price: 10 },
  { id: "p2", name: "Product B", price: 20 },
  { id: "p3", name: "Product C", price: 30 },
  { id: "p4", name: "Product D", price: 40 },
];

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  // Update localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save new or updated transaction
  const handleSaveTransaction = (transaction) => {
    if (editingTransaction) {
      const updatedTransactions = transactions.map((t) =>
        t.id === editingTransaction.id ? { ...t, ...transaction } : t
      );
      setTransactions(updatedTransactions);
      setEditingTransaction(null);
    } else {
      const newTransaction = { id: uuidv4(), ...transaction };
      setTransactions([...transactions, newTransaction]);
    }
    setIsFormOpen(false);
  };

  // Handle Edit action
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  // Handle Delete action
  const handleDelete = (id) => {
    const filteredTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(filteredTransactions);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#2c447f]">
          Transactions
        </h2>

        {/* Transactions Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Product Name
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Total Price
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Net Total Price
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody className="divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((transaction) =>
                    // For each transaction, render a row for each product
                    transaction.products.map((product, index) => (
                      <motion.tr
                        key={`${transaction.id}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="hover:bg-gray-100 transition"
                      >
                        {/* Render transaction id once per transaction */}
                        {index === 0 && (
                          <td
                            className="px-4 py-2 font-semibold bg-gray-50"
                            rowSpan={transaction.products.length}
                          >
                            {transaction.id}
                          </td>
                        )}
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2 text-center">
                          {product.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                          ${product.price}
                        </td>
                        <td className="px-4 py-2 text-right">
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>
                        {/* Render Net Total and Actions once per transaction */}
                        {index === 0 && (
                          <>
                            <td
                              className="px-4 py-2 text-right font-bold bg-gray-50"
                              rowSpan={transaction.products.length}
                            >
                              ${transaction.netTotalPrice}
                            </td>
                            <td
                              className="px-4 py-2 bg-gray-50"
                              rowSpan={transaction.products.length}
                            >
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => handleEdit(transaction)}
                                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(transaction.id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </motion.tr>
                    ))
                  )
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td
                      colSpan="7"
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      No transactions available.
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Floating "Add Transaction" Button */}
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingTransaction(null);
          }}
          className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          + Add Transaction
        </button>

        {/* Transaction Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50"
              role="dialog"
              aria-modal="true"
            >
              <TransactionForm
                isEditing={!!editingTransaction}
                handleSaveTransaction={handleSaveTransaction}
                setIsFormOpen={setIsFormOpen}
                predefinedProducts={predefinedProducts}
                editingTransaction={editingTransaction}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransactionList;

import React, { useState, useEffect } from "react";
import {TransactionForm} from "../components/TransactionForm.jsx";
import { v4 as uuidv4 } from "uuid";

// Predefined products
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

  // Store transactions in localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save new or updated transaction
  const handleSaveTransaction = (transaction) => {
    if (editingTransaction) {
      // Update existing transaction
      const updatedTransactions = transactions.map((t) =>
        t.id === editingTransaction.id ? { ...t, ...transaction } : t
      );
      setTransactions(updatedTransactions);
      setEditingTransaction(null);
    } else {
      // Save new transaction with a unique ID
      const newTransaction = { id: uuidv4(), ...transaction };
      setTransactions([...transactions, newTransaction]);
    }
    setIsFormOpen(false);
  };

  // Handle Edit
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const filteredTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(filteredTransactions);
  };

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        Transactions
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Net Total Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) =>
              transaction.products.map((product, index) => (
                <tr key={`${transaction.id}-${index}`} className="text-center">
                  {/* Transaction ID displayed only once per transaction */}
                  {index === 0 && (
                    <td className="border p-2 font-semibold bg-gray-100" rowSpan={transaction.products.length}>
                      {transaction.id}
                    </td>
                  )}
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.quantity}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">${product.price * product.quantity}</td>

                  {index === 0 && (
                    <>
                      <td className="border p-2 font-bold bg-gray-100" rowSpan={transaction.products.length}>
                        ${transaction.netTotalPrice}
                      </td>
                      <td className="border p-2 bg-gray-100" rowSpan={transaction.products.length}>
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="7" className="border p-4 text-center text-gray-500">
                No transactions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditingTransaction(null);
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        + Add Transaction
      </button>

      {isFormOpen && (
        <TransactionForm
          isEditing={!!editingTransaction}
          handleSaveTransaction={handleSaveTransaction}
          setIsFormOpen={setIsFormOpen}
          predefinedProducts={predefinedProducts}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  );
};

export default TransactionList;

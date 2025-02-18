import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TransactionCard = ({
  transaction,
  onEdit,
  onDelete,
  predefinedProducts,
}) => {
  const [productName, setProductName] = useState("Loading...");
  const [productPrice, setProductPrice] = useState(null);

  useEffect(() => {
    // Check if predefinedProducts is a valid array and has items
    if (Array.isArray(predefinedProducts) && predefinedProducts.length > 0) {
      const product = predefinedProducts.find(
        (prod) => prod.id === transaction.productId
      );
      if (product) {
        setProductName(product.name);
        setProductPrice(product.price);
      } else {
        setProductName("Product not found");
        setProductPrice(null);
      }
    } else {
      setProductName("No products available");
      setProductPrice(null);
    }
  }, [transaction.productId, predefinedProducts]);

  // Calculate total price if productPrice exists; otherwise, display "N/A"
  const totalPrice =
    productPrice !== null
      ? (productPrice * transaction.quantity).toFixed(2)
      : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 sm:p-6 space-y-4 sm:space-y-6 border border-gray-300 text-center transition-transform"
      role="article"
      aria-label={`Transaction card for ID ${transaction.id}`}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-[#4c76ba] transition">
        Transaction ID: {transaction.id}
      </h3>
      <div className="w-full text-left space-y-2 sm:space-y-3">
        <p className="text-base sm:text-lg text-gray-700">
          <span className="font-semibold">Product:</span> {productName}
        </p>
        <p className="text-base sm:text-lg text-gray-700">
          <span className="font-semibold">Price:</span>{" "}
          {totalPrice !== "N/A" ? `$${totalPrice}` : "N/A"}
        </p>
        <div className="flex items-center text-base sm:text-lg text-gray-700">
          <span className="font-semibold">Quantity:</span>
          <span className="ml-2">{transaction.quantity}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between space-x-2 sm:space-x-4 w-full">
        <button
          onClick={() => onEdit(transaction.id)}
          className="flex-1 bg-[#4c76ba] text-white text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Edit transaction"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="flex-1 bg-[#d9534f] text-white text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete transaction"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TransactionCard;

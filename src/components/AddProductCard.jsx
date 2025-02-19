import React, { useState } from "react";
import { motion } from "framer-motion";

export const AddProductCard = ({ product, onEdit, onDelete, onUpdateStock }) => {
  const [stockChange, setStockChange] = useState("");

  const handleStockChange = (e) => {
    setStockChange(e.target.value);
  };

  const handleStockUpdate = (type) => {
    const amount = parseInt(stockChange, 10);
    if (!isNaN(amount) && amount > 0) {
      onUpdateStock(type === "add" ? amount : -amount);
      setStockChange("");
    } else {
      alert("Please enter a valid positive number.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Product Image */}
      {product.productImage ? (
        <div className="relative">
          <img
            src={product.productImage}
            alt={product.productName || "Product"}
            className="w-full h-56 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-blue-500 opacity-10" />
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-200 w-full h-56">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {product.productName || "Unnamed Product"}
        </h3>
        {product.categoryName && (
          <p className="text-sm text-gray-500 mb-2">Category: {product.categoryName}</p>
        )}
        <div className="space-y-2 text-gray-700 mb-4">
          <p>
            <span className="font-semibold">Price:</span> ${Number(product.productPrice).toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {product.quantity}
          </p>
          <p>
            <span className="font-semibold">SNF:</span> {product.snf}
          </p>
          <p>
            <span className="font-semibold">FAT:</span> {product.fat}
          </p>
        </div>

        {/* Edit & Delete Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEdit}
            className="flex-1 bg-blue-600 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDelete}
            className="flex-1 bg-red-500 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200"
          >
            Delete
          </motion.button>
        </div>

        {/* Stock Adjustment */}
                {/* Stock Adjustment */}
                <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center w-full">
          <input
            type="number"
            value={stockChange}
            onChange={handleStockChange}
            placeholder="Enter stock amount"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center min-w-0"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleStockUpdate("add")}
            className="bg-green-600 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200 w-full sm:w-auto"
          >
            + Add
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleStockUpdate("subtract")}
            className="bg-yellow-500 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200 w-full sm:w-auto"
          >
            - Subtract
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

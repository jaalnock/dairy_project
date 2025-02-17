// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";

export const AddProductCard = ({ product, onEdit, onDelete }) => {
  // Expecting product fields: productName, productPrice, productImage, snf, fat, quantity
  // ...plus categoryName (added when flattening the data)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      {console.log(product.productImage)}
      {/* Product Image or fallback */}
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
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.categoryName}
          </p>
        )}
        <div className="space-y-2 text-gray-700 mb-6">
          <p>
            <span className="font-semibold">Price:</span> $
            {Number(product.productPrice).toFixed(2)}
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
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEdit}
            aria-label={`Edit ${product.productName}`}
            className="flex-1 bg-blue-600 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDelete}
            aria-label={`Delete ${product.productName}`}
            className="flex-1 bg-red-500 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

import React from "react";
import { motion } from "framer-motion";

export const AddProductCard = ({ product, onEdit, onDelete }) => {
  console.log("Rendering ProductCard with product:", product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Product Image or Fallback */}
      {product.imageUrl ? (
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name || "Product image"}
            loading="lazy"
            className="w-full h-56 object-cover"
          />
          {/* Subtle blue overlay */}
          <div className="absolute inset-0 bg-blue-500 opacity-10" />
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-200 w-full h-56">
          <span className="text-gray-500 text-lg">No Image Available</span>
        </div>
      )}

      <div className="p-6">
        {/* Product Details */}
        <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-4">
          {product.name || "Unnamed Product"}
        </h3>
        <div className="space-y-2 text-gray-700 mb-6">
          <p className="text-lg">
            <span className="font-semibold">Price:</span>{" "}
            {product.price ? `$${product.price.toFixed(2)}` : "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Quantity:</span>{" "}
            {product.quantity ?? "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">SNF:</span> {product.snf ?? "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">FAT:</span> {product.fat ?? "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onEdit(product.id)}
            aria-label={`Edit ${product.name || "product"}`}
            className="flex-1 bg-blue-600 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onDelete(product.id)}
            aria-label={`Delete ${product.name || "product"}`}
            className="flex-1 bg-red-500 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

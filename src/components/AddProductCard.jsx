import React from "react";

export const AddProductCard = ({ product, onEdit, onDelete }) => {
  console.log("Rendering ProductCard with product:", product); // Debugging

  return (
    <div className="bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-6 space-y-6 border border-gray-300 text-center transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Product Image */}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-48 h-48 object-cover rounded-lg border border-gray-200"
        />
      )}

      {/* Product Details */}
      <h3 className="text-2xl font-bold text-gray-800 hover:text-[#4c76ba] transition">
        {product.name || "Unnamed Product"} {/* Displaying product name */}
      </h3>
      <div className="w-full text-left space-y-3">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Price:</span> $
          {product.price ? product.price.toFixed(2) : "N/A"}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Quantity:</span>{" "}
          {product.quantity ?? "N/A"}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">SNF:</span> {product.snf ?? "N/A"}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">FAT:</span> {product.fat ?? "N/A"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between space-x-4 w-full">
        <button
          onClick={() => onEdit(product.id)}
          className="flex-1 bg-[#4c76ba] text-white text-lg px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-xl transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-[#d9534f] text-white text-lg px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-xl transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

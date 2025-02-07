import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="flex flex-col h-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white transition duration-300 hover:shadow-xl hover:border-blue-400 group">
      {/* Product Image */}
      <img
        className="w-full h-48 sm:h-56 object-cover transform transition-transform duration-300 group-hover:scale-110"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <div className="flex-grow">
          {/* Product Name */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price and Stock Status */}
          <div className="mt-2 sm:mt-3 mb-2 sm:mb-3">
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-bold text-green-600">
                ${product.price}
              </span>

              {product.inStock ? (
                <span className="bg-green-100 text-green-800 text-xs font-semibold py-1 px-2 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-semibold py-1 px-2 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-2">
          <button
            className="w-full bg-blue-500 text-white text-sm sm:text-base px-3 py-2 rounded-lg border border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition duration-300"
            onClick={handleClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../config";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product by ID from the products array
    const fetchedProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(fetchedProduct);
  }, [id]);

  const handleBackClick = () => {
    navigate("/products");
  };

  const handleInquireClick = () => {
    navigate("/contact-us");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-12">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-500 text-white transition duration-300 w-12 h-12 rounded-full flex items-center justify-center"
      >
        <span className="text-xl">&larr;</span>
      </button>

      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Product Image */}
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-8 text-gray-800">
          <h2 className="text-4xl font-semibold text-blue-600 mb-4">
            {product.name}
          </h2>

          {/* Status Badge */}
          <div className="mt-2 mb-4">
            {product.inStock ? (
              <span className="bg-green-100 text-green-800 text-xs font-semibold py-1 px-4 rounded-full shadow-md">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-semibold py-1 px-4 rounded-full shadow-md">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-lg text-gray-700 mt-3">{product.description}</p>

          {/* Specifications */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Specifications
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>SNF:</strong> {product.snf || "N/A"}
              </li>
              <li>
                <strong>Fat Content:</strong> {product.fatContent || "N/A"}
              </li>
              <li>
                <strong>Quantity:</strong> {product.quantity || "N/A"}
              </li>
            </ul>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-green-600 mt-6">
            ${product.price}
          </p>

          {/* Status Message */}
          <p className="text-sm text-gray-500 mt-1">
            Availability: {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Inquire Us Button */}
          <div className="mt-6">
            <button
              onClick={handleInquireClick}
              disabled={!product.inStock}
              className={`${
                product.inStock
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              } text-white px-6 py-3 rounded-full font-semibold transition-all duration-300`}
            >
              Inquire Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



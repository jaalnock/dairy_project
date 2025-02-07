// src/ProductList.jsx

import React, { useState } from "react";
import { ProductCard } from "../components/index.js";
import { products } from "../config";

// Categorized Products
const categories = [
  { category: "All", productIds: [] }, // 'All' shows all products
  { category: "Milk", productIds: [1, 2, 3, 8] },
  { category: "Cheese", productIds: [4, 12, 14] },
  { category: "Yogurt", productIds: [5, 6, 7, 11] },
  { category: "Sweets", productIds: [9, 15] },
  { category: "Cooking", productIds: [10, 13] },
];

// Products Array

export const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products // Show all products for "All"
      : products.filter((product) =>
          categories
            .find((cat) => cat.category === selectedCategory)
            ?.productIds.includes(product.id)
        );

  return (
    <div className="py-6 px-4 sm:px-10">
      {/* Heading for Dairy Products */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
        Dairy Products
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.category}
            onClick={() => setSelectedCategory(category.category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              selectedCategory === category.category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {category.category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-full">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};


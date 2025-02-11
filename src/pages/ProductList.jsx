import React, { useState } from "react";
import { ProductCard } from "../components/index.js";
import { products } from "../config";
import { useTranslation } from "react-i18next";

// Categorized Products
const categories = [
  { category: "all", productIds: [] }, // 'All' shows all products
  { category: "milk", productIds: [1, 2, 3, 8] },
  { category: "cheese", productIds: [4, 12, 14] },
  { category: "yogurt", productIds: [5, 6, 7, 11] },
  { category: "sweets", productIds: [9, 15] },
  { category: "cooking", productIds: [10, 13] },
];

export const ProductList = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get products based on selected category
  const filteredProducts =
    selectedCategory === "all"
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
        {t("products.title")}
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
            {t(`products.categories.${category.category}`)}
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
            {t("products.noProducts")}
          </p>
        )}
      </div>
    </div>
  );
};

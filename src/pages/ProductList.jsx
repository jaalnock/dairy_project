// import React, { useState } from "react";
// import { ProductCard } from "../components/index.js";
// import { products } from "../config";
// import { useTranslation } from "react-i18next";

// // Categorized Products
// const categories = [
//   { category: "all", productIds: [] }, // 'All' shows all products
//   { category: "milk", productIds: [1, 2, 3, 8] },
// ];

// export const ProductList = () => {
//   const { t } = useTranslation();
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   // Get products based on selected category
//   const filteredProducts =
//     selectedCategory === "all"
//       ? products // Show all products for "All"
//       : products.filter((product) =>
//           categories
//             .find((cat) => cat.category === selectedCategory)
//             ?.productIds.includes(product.id)
//         );

//   return (
//     <div className="py-6 px-4 sm:px-10">
//       {/* Heading for Dairy Products */}
//       <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
//         {t("products.title")}
//       </h2>

//       {/* Category Buttons */}
//       <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
//         {categories.map((category) => (
//           <button
//             key={category.category}
//             onClick={() => setSelectedCategory(category.category)}
//             className={`px-3 py-2 rounded-lg text-sm font-medium ${
//               selectedCategory === category.category
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } hover:bg-blue-500 hover:text-white transition`}
//           >
//             {t(`products.categories.${category.category}`)}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product.id} className="flex-shrink-0 w-full">
//               <ProductCard product={product} />
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">
//             {t("products.noProducts")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../components/index.js";
import { useTranslation } from "react-i18next";

export const ProductList = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch branches from backend
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/branch/get-branches-for-customer"
        );
        setBranches(response.data.data);
      } catch (err) {
        setError("Failed to fetch branches. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Function to handle branch selection
  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    console.log(branchId)
    setSelectedBranch(branchId); // Update selected branch
    setCategories([]); // Clear previous categories
    setProducts([]); // Clear previous products
  };

  // Fetch categories when a branch is selected
  // Fetch categories when a branch is selected
useEffect(() => {
  if (selectedBranch) {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/category/get-categories-by-branch/${selectedBranch}`
        );

        // Extract correct category fields from response
        const formattedCategories = response.data.data.map((category) => ({
          id: category._id, // Correcting to match your backend
          name: category.categoryName, // Using categoryName field
        }));

        // Add "All" category at the beginning
        const updatedCategories = [{ id: "all", name: "All" }, ...formattedCategories];
        setCategories(updatedCategories);
        setSelectedCategory("all"); // Auto-select "All"
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }
}, [selectedBranch]);

  // Fetch products when a category is selected
  useEffect(() => {
    if (selectedCategory && selectedBranch) {
      const fetchProducts = async () => {
        const categoryId = selectedCategory
        try {
          const url =
            selectedCategory === "all"
              ? `http://localhost:8000/api/v1/category/get-all-products/${selectedBranch}`
              : `http://localhost:8000/api/v1/category/get-category-from-branch-id/${selectedBranch}/${categoryId}`;

          const response = await axios.get(url);
          console.log(response.data.data)
          setProducts(response.data.data);
        } catch (err) {
          setError("Failed to fetch products.");
        }
      };
      fetchProducts();
    }
  }, [selectedCategory, selectedBranch]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex-grow py-6 px-4 sm:px-10">
        {/* Branch Selection Form (Popup) */}
        {!selectedBranch && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4 z-50">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-11/12 max-w-md text-center relative overflow-auto max-h-[90vh]">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Select Your Branch
              </h2>

              {/* Show loading spinner or error message */}
              {loading ? (
                <p className="text-gray-500">Loading branches...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={handleBranchChange}
                  value={selectedBranch} // Ensure correct selection
                >
                  <option value="">-- Select Branch --</option>
                  {branches.map((branch) => (
                    <option key={branch.branchId} value={branch.branchId}>
                      {branch.branchAddress}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )}

        {/* Only show categories & products if a branch is selected */}
        {selectedBranch && (
          <>
            {/* Heading for Dairy Products */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
              {t("products.title")}
            </h2>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
              {categories.length > 0 ? (
                categories.map((category) => (
                  
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 text-sm sm:text-base rounded-lg font-medium ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-blue-500 hover:text-white transition`}
                  >
                    {category.name}
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500">No categories available</p>
              )}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
         {products.length > 0 ? (
          products.map((product) => (
            <div key={product.productName} className="flex-shrink-0 w-full">
              <ProductCard product={product} selectedBranch={selectedBranch} categoryId={selectedCategory}/>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            {t("products.noProducts")}
          </p>
        )}
      </div>
          </>
        )}
      </div>
    </div>
  );
};

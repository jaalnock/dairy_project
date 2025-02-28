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
  const [subAdmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch branches from the backend on component mount.
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/branch/get-branches",
          { withCredentials: true }
        );
        console.log("Fetched branches:", response.data.data);

        // Assuming your response structure is { data: { data: [...] } }
        setBranches(response.data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Fetch categories whenever the selected branch changes.
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/get-all-categories",
          { withCredentials: true }
        );
        // Assuming your response structure is { data: { data: [...] } }
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [selectedBranch]);

  // Fetch subadmin details for the selected branch.
  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        if (selectedBranch) {
          const response = await axios.get(
            `/api/subadmins?branchId=${selectedBranch}`
          );
          // Assuming your response structure is { data: { data: [...] } }
          setSubAdmins(response.data.data);
        } else {
          setSubAdmins([]);
        }
      } catch (error) {
        console.error("Error fetching subadmins:", error);
      }
    };

    fetchSubAdmins();
  }, [selectedBranch]);

  // Prepare a list of products based on selected category.
  let filteredProducts = [];
  if (selectedCategory === "all") {
    filteredProducts = categories.reduce(
      (acc, category) => acc.concat(category.products),
      []
    );
  } else {
    // Assuming each category object has a property `categoryName`
    const category = categories.find(
      (cat) => cat.categoryName === selectedCategory
    );
    filteredProducts = category ? category.products : [];
  }

  return (
    <div className="py-6 px-4 sm:px-10">
      {/* Page Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
        {t("products.title")}
      </h2>

      {/* Branch Selector */}
      <div className="mb-4 text-center">
        <label htmlFor="branchSelect" className="mr-2 font-medium">
          Select Branch
        </label>
        <select
          id="branchSelect"
          value={selectedBranch}
          onChange={(e) => {
            setSelectedBranch(e.target.value);
            setSelectedCategory("all"); // Reset category selection when branch changes
          }}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.location}
            </option>
          ))}
        </select>
      </div>

      {/* Subadmin Information */}
      {subAdmins.length > 0 && (
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium">{t("products.subAdminTitle")}</h3>
          <ul className="flex justify-center gap-4">
            {subAdmins.map((subAdmin) => (
              <li key={subAdmin._id} className="px-3 py-2 border rounded">
                {subAdmin.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        <button
          key="all"
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition`}
        >
          {t("products.categories.all")}
        </button>
        {categories.map((category) => (
          <button
            key={category.categoryName}
            onClick={() => setSelectedCategory(category.categoryName)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              selectedCategory === category.categoryName
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {t(`products.categories.${category.categoryName}`)}
          </button>
        ))}
      </div>

      {/* Product Listing */}
      {loading ? (
        <p className="text-center text-gray-500">{t("products.loading")}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-full">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              {t("products.noProducts")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

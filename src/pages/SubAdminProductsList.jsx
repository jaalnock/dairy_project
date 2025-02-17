import React, { useState, useEffect } from "react";
import { AddProductCard } from "../components/AddProductCard.jsx";
import { AddProductForm } from "../components/AddProductForm.jsx";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

// Predefined products (fallback)
const predefinedProducts = [
  {
    id: "p1",
    imageUrl: "url1",
    name: "Product A",
    quantity: 10,
    price: 100,
    snf: 8.5,
    fat: 4.5,
  },
  {
    id: "p2",
    imageUrl: "url2",
    name: "Product B",
    quantity: 20,
    price: 200,
    snf: 8.8,
    fat: 5.0,
  },
  {
    id: "p3",
    imageUrl: "url3",
    name: "Product C",
    quantity: 30,
    price: 300,
    snf: 9.0,
    fat: 5.5,
  },
  {
    id: "p4",
    imageUrl: "url4",
    name: "Product D",
    quantity: 40,
    price: 400,
    snf: 9.2,
    fat: 6.0,
  },
];

export const SubAdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    quantity: "",
    price: "",
    snf: "",
    fat: "",
  });

  // Load products from localStorage or use predefined ones
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || predefinedProducts;
    setProducts(storedProducts);
  }, []);

  // Update localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setFormData({ ...productToEdit });
      setIsEditing(true);
      setEditId(id);
      setIsFormOpen(true);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    const updatedProducts = products.filter(
      (product) => product.id !== deleteId
    );
    setProducts(updatedProducts);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert numeric fields to numbers if applicable
    const parsedValue =
      ["price", "quantity", "snf", "fat"].includes(name) && value.trim() !== ""
        ? parseFloat(value)
        : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSaveProduct = () => {
    // Basic validation: check required fields and positive quantity
    if (
      !formData.imageUrl ||
      !formData.name ||
      !formData.quantity ||
      isNaN(formData.quantity) ||
      formData.quantity <= 0
    ) {
      alert("Please fill in all required fields with valid values!");
      return;
    }

    const productData = { id: uuidv4(), ...formData };

    if (isEditing) {
      const updatedProducts = products.map((product) =>
        product.id === editId ? productData : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, productData]);
    }

    // Reset form and close modal
    setIsFormOpen(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      imageUrl: "",
      name: "",
      quantity: "",
      price: "",
      snf: "",
      fat: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
          Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AddProductCard
                    product={product}
                    onEdit={() => handleEdit(product.id)}
                    onDelete={() => confirmDelete(product.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No products available.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating "Add Product" Button */}
        <button
          onClick={() => {
            setIsFormOpen(true);
            setIsEditing(false);
            setFormData({
              imageUrl: "",
              name: "",
              quantity: "",
              price: "",
              snf: "",
              fat: "",
            });
          }}
          className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          + Add Product
        </button>

        {/* Add/Edit Product Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50"
              role="dialog"
              aria-modal="true"
            >
              <AddProductForm
                isEditing={isEditing}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSaveProduct={handleSaveProduct}
                setIsFormOpen={setIsFormOpen}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto"
              >
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Confirm Deletion
                </h3>
                <p className="text-center mb-6">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-[#4c76ba] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-150"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-[#d9534f] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-150"
                  >
                    Yes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubAdminProductsList;

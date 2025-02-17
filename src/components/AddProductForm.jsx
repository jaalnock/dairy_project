import React, { useState } from "react";
import { motion } from "framer-motion";

export const AddProductForm = ({
  isEditing,
  formData = {},
  handleInputChange,
  handleSaveProduct,
  setIsFormOpen,
}) => {
  const { name = "", price = "", quantity = "", snf = "", fat = "" } = formData;
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Disable Save button if form is not valid
  const isFormValid =
    name.trim() &&
    price &&
    quantity &&
    !isNaN(price) &&
    Number(price) > 0 &&
    !isNaN(quantity) &&
    Number(quantity) > 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Product" : "Add Product"}
          </h3>
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Close form"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SNF
                </label>
                <input
                  type="number"
                  name="snf"
                  value={snf}
                  onChange={handleInputChange}
                  placeholder="SNF value"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FAT
                </label>
                <input
                  type="number"
                  name="fat"
                  value={fat}
                  onChange={handleInputChange}
                  placeholder="FAT value"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full max-h-40 object-contain rounded-lg shadow-md"
                />
              )}
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveProduct}
            disabled={!isFormValid}
            className={`flex-1 ${
              isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400"
            } text-white py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

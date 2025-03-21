// src/components/AddProductForm.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const AddProductForm = ({
  isEditing,
  initialData = {},
  categories = [],
  onClose,
  onSave,
}) => {
  const [msgOnBtn , setMsgOnBtn] = useState("Save");
  // Initialize form state with expected fields
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    quantity: "",
    snf: "",
    fat: "",
    unit: "",
    categoryId: "",
    productImage: "",
    ...initialData,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    formData.productImage || null
  );

  // Update form state when editing changes
  useEffect(() => {
    setFormData({
      productName: "",
      productPrice: "",
      quantity: "",
      snf: "",
      fat: "",
      unit: "",
      categoryId: "",
      productImage: "",
      ...initialData,
    });
    setImagePreview(initialData.productImage || null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Basic validation for required fields.
  // Note: Allowing quantity, snf, and fat to be 0 (using >= 0)
  const isFormValid =
    formData.productName.trim() &&
    formData.productPrice &&
    !isNaN(formData.productPrice) &&
    Number(formData.productPrice) > 0 &&
    formData.quantity !== "" &&
    !isNaN(formData.quantity) &&
    Number(formData.quantity) >= 0 &&
    formData.snf !== "" &&
    !isNaN(formData.snf) &&
    Number(formData.snf) >= 0 &&
    formData.fat !== "" &&
    !isNaN(formData.fat) &&
    Number(formData.fat) >= 0 &&
    formData.categoryId;

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!isFormValid) {
        toast.error("Please fill in all required fields with valid values!");
        return;
      }
    
      setMsgOnBtn("Saving . . ."); // Show Saving message
    
      try {
        // Create a FormData object to send both text fields and the file
        const formDataToSend = new FormData();
        formDataToSend.append("productName", formData.productName);
        formDataToSend.append("productPrice", parseFloat(formData.productPrice));
        formDataToSend.append("quantity", parseInt(formData.quantity, 10));
        formDataToSend.append("snf", parseFloat(formData.snf));
        formDataToSend.append("fat", parseFloat(formData.fat));
        formDataToSend.append("unit", formData.unit || 0);
    
        // Append the file (if one was selected) using the key "file"
        if (imageFile) {
          formDataToSend.append("file", imageFile);
        }
    
        // Await the save operation (assuming onSave is async)
        await onSave(formData.categoryId, formDataToSend);
    
        setMsgOnBtn("Saved ✅"); // Show success message
        setTimeout(() => setMsgOnBtn("Save"), 2000); // Reset after 2s
      } catch (error) {
        toast.error("Error saving product. Please try again!");
        setMsgOnBtn("Save"); // Reset button if error occurs
      }
    };
    

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Product" : "Add Product"}
          </h3>
          <button
            onClick={onClose}
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

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
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
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SNF
                </label>
                <input
                  type="number"
                  name="snf"
                  value={formData.snf}
                  onChange={handleChange}
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
                  value={formData.fat}
                  onChange={handleChange}
                  placeholder="FAT value"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                name="file"
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

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 ${
                  isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400"
                } text-white py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                {msgOnBtn}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

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
  const [msgOnBtn, setMsgOnBtn] = useState("Save");
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    quantity: "",
    unit: "",
    categoryId: "",
    productImage: "",
    ...initialData,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    formData.productImage || null
  );

  useEffect(() => {
    setFormData({
      productName: "",
      productPrice: "",
      quantity: "",
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

  const isFormValid =
    formData.productName.trim() &&
    formData.productPrice &&
    !isNaN(formData.productPrice) &&
    Number(formData.productPrice) > 0 &&
    formData.quantity !== "" &&
    !isNaN(formData.quantity) &&
    Number(formData.quantity) >= 0  &&
    formData.categoryId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields with valid values!");
      return;
    }

    setMsgOnBtn("Saving...");
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productPrice", parseFloat(formData.productPrice));
      formDataToSend.append("quantity", parseInt(formData.quantity, 10));
      formDataToSend.append("unit", formData.unit || 0);
      if (imageFile) {
        formDataToSend.append("file", imageFile);
      }
    
      setMsgOnBtn("Saving . . ."); // Show Saving message
      
      try {
        // Create a FormData object to send both text fields and the file
        const formDataToSend = new FormData();
        formDataToSend.append("productName", formData.productName);
        formDataToSend.append("productPrice", parseFloat(formData.productPrice));
        formDataToSend.append("quantity", parseInt(formData.quantity, 10));
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
  }

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex justify-center items-center px-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-full max-h-48 object-cover rounded-md border border-gray-200"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-2.5 px-4 rounded-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
            >
              {msgOnBtn}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
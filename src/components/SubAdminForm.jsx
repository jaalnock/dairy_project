import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import { ErrorDialog } from "./ErrorDialog";

export const SubAdminForm = ({
  isEditing,
  formData,
  handleInputChange,
  handleFileChange,
  handleSaveSubAdmin,
  setIsFormOpen,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState([]);

  // Update preview whenever formData.image changes.
  useEffect(() => {
    if (formData.image) {
      // If the image is a File object, create an object URL for preview.
      if (typeof formData.image === "object") {
        const previewUrl = URL.createObjectURL(formData.image);
        setImagePreview(previewUrl);

        // Revoke object URL on cleanup to avoid memory leaks.
        return () => URL.revokeObjectURL(previewUrl);
      } else if (typeof formData.image === "string") {
        // If it's already a URL (from backend, for example), use it.
        setImagePreview(formData.image);
      }
    } else {
      setImagePreview(null);
    }
  }, [formData.image]);

  // Handle file input changes. Generate a preview and pass the file to parent.
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generate preview URL.
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Let the parent update the formData with the file.
      handleFileChange(event);
    }
  };

  // Remove the selected image.
  const handleRemoveImage = () => {
    setImagePreview(null);
    // Trigger parent's file change handler to set the image field to null.
    handleFileChange({ target: { name: "image", files: [] } });
  };

  const validateInputs = () => {
    const newErrors = [];
    if (!formData.name) newErrors.push("Name is required.");
    if (!formData.mobile || isNaN(formData.mobile))
      newErrors.push("Mobile number must be a valid number.");
    if (!formData.password) newErrors.push("Password is required.");
    if (!formData.branchId || isNaN(formData.branchId))
      newErrors.push("Branch ID must be a valid number.");
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await handleSaveSubAdmin();
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 && error.response.data && error.response.data.message) {
            setErrors([error.response.data.message]);
          } else {
            setErrors(["An unexpected error occurred. Please try again."]);
          }
        } else if (error.code === 'ERR_NETWORK') {
          setErrors(["Network error. Please check your connection and try again."]);
        } else {
          setErrors(["An unexpected error occurred. Please try again."]);
        }
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-500/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-2xl z-30 relative">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Sub-Admin" : "Add Sub-Admin"}
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-gray-700 font-semibold">Image</label>
            <label
              htmlFor="image"
              className="cursor-pointer bg-[#2c447f] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#1f3260] transition duration-200"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {imagePreview && (
              <div className="relative mt-4 w-48 h-48 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
                >
                  <XCircle className="h-6 w-6 text-red-500" />
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Branch ID
            </label>
            <input
              type="text"
              name="branchId"
              placeholder="Enter branch ID"
              value={formData.branchId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
        </form>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg hover:bg-[#1b2d5b] transition"
          >
            Save
          </button>
        </div>
      </div>
      {errors.length > 0 && (
        <ErrorDialog errors={errors} onClose={() => setErrors([])} />
      )}
    </div>
  );
};

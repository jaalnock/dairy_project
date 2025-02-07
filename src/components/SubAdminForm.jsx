import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

export const SubAdminForm = ({
  isEditing,
  formData,
  handleInputChange,
  handleFileChange,
  handleSaveSubAdmin,
  setIsFormOpen,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    }
  }, [formData.image]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      handleFileChange(event);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    handleFileChange({ target: { name: "image", value: "" } });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-500/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-2xl z-30 relative">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit SubAdmin" : "Add New SubAdmin"}
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-gray-700 font-semibold">
              Profile Picture
            </label>
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
              placeholder="Image URL"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {imagePreview && (
              <div className="relative mt-4 w-48 h-48 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Uploaded Image"
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
            <label className="block text-gray-700 font-semibold">
              Mobile No.
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile No."
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
              placeholder="Password"
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
              placeholder="Address"
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
              placeholder="Branch ID"
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
            onClick={handleSaveSubAdmin}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg hover:bg-[#1b2d5b] transition"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};



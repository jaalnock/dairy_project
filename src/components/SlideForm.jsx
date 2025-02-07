import React, { useState } from "react";
import { XCircle } from "lucide-react";

export const SlideForm = ({
  isEditing,
  formData,
  handleInputChange,
  handleFileChange,
  handleSaveSlide,
  setIsFormOpen,
}) => {
  const [image, setImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      handleFileChange(event); 
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Slide" : "Add New Slide"}
        </h3>
        <form className="space-y-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="image"
              className="cursor-pointer bg-[#2c447f] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#1f3260] transition duration-200"
            >
              Choose Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {image && (
              <div className="relative mt-4 w-48 h-48 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={image}
                  alt="Uploaded"
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Slide Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Slide Description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveSlide}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg hover:bg-[#1b2d5b] transition"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};


import React from "react";

export const AddProductForm = ({
  isEditing,
  formData = {},
  handleInputChange,
  handleSaveProduct,
  setIsFormOpen,
}) => {
  const { name = "", price = "", quantity = "", imageUrl = "", snf = "", fat = "" } = formData;

  // Disable Save button if form is not valid
  const isFormValid = name && price && quantity && !isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Product" : "Add Product"}
        </h3>

        {/* Scrollable Content */}
        <div className="max-h-[65vh] overflow-y-auto pr-2">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">SNF</label>
              <input
                type="number"
                name="snf"
                value={snf}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">FAT</label>
              <input
                type="number"
                name="fat"
                value={fat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg mt-2"
              />
            </div>
          </form>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveProduct}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg"
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

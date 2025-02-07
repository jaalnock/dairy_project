import React from "react";

export const BranchForm = ({
  isEditing,
  formData,
  handleInputChange,
  handleSaveBranch,
  setIsFormOpen,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Branch" : "Add New Branch"}
        </h3>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="branchId"
              className="block text-sm font-medium text-gray-700"
            >
              Branch ID
            </label>
            <input
              type="text"
              id="branchId"
              name="branchId"
              placeholder="Enter Branch ID"
              value={formData.branchId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
          <div>
            <label
              htmlFor="villageCity"
              className="block text-sm font-medium text-gray-700"
            >
              Village/City Name
            </label>
            <input
              type="text"
              id="villageCity"
              name="villageCity"
              placeholder="Enter Village/City Name"
              value={formData.villageCity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c447f]"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveBranch}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg hover:bg-[#1b2d5b] transition"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};


import React from "react";

export const ErrorDialog = ({ errors, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Validation Errors
        </h3>
        <ul className="list-disc list-inside text-red-600 mb-4">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-[#4c76ba] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

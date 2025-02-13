import React from "react";
import { useTranslation } from "react-i18next";

export const BranchCard = ({ branch, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-xl rounded-2xl p-6 border border-gray-300 h-auto min-h-72 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 border-b pb-2">
          {t("branch.card.branchIdLabel")}: {branch.branchId}
        </h2>
        <p className="text-gray-700 text-lg">
          <strong>{t("branch.card.addressLabel")}:</strong>{" "}
          {branch.branchAddress}
        </p>
        <p className="text-gray-700 text-lg">
          <strong>{t("branch.card.villageCityLabel")}:</strong>{" "}
          {branch.location}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between mt-4 space-x-3">
        <button
          className="flex-1 bg-[#4c76ba] text-white text-lg font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#3b5c94] hover:shadow-lg transition"
          onClick={() => onEdit(branch.branchId)}
        >
          {t("branch.buttons.edit")}
        </button>
        <button
          className="flex-1 bg-[#d9534f] text-white text-lg font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#b52b27] hover:shadow-lg transition"
          onClick={() => onDelete(branch.branchId)}
        >
          {t("branch.buttons.delete")}
        </button>
      </div>
    </div>
  );
};

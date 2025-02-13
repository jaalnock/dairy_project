import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SubAdminCard = ({ subAdmin, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [villageCity, setVillageCity] = useState("");

  useEffect(() => {
    const storedBranches = JSON.parse(localStorage.getItem("branches")) || [];
    const branch = storedBranches.find(
      (branch) => branch.branchId === subAdmin.branchId
    );
    if (branch) {
      setVillageCity(branch.villageCity);
    }
  }, [subAdmin.branchId]);

  return (
    <div className="bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-2xl rounded-2xl overflow-hidden flex flex-col items-center p-6 space-y-6 border border-gray-300 text-center transition-transform transform hover:scale-105 hover:shadow-3xl">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-blue-500 hover:shadow-lg transition">
        <img
          src={subAdmin.profilePicture}
          alt={t("subAdmin.card.imageAlt", { name: subAdmin.name })}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 hover:text-[#4c76ba] transition">
        {subAdmin.name}
      </h3>
      <div className="w-full text-left space-y-3">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">{t("subAdmin.card.mobile")}:</span>{" "}
          {subAdmin.mobileNumber}
        </p>
        <div className="relative flex items-center text-lg text-gray-700">
          <span className="font-semibold">{t("subAdmin.card.password")}:</span>
          <span className="ml-2">
            {showPassword ? subAdmin.password : "••••••••"}
          </span>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-3 text-gray-500 hover:text-gray-700 transition"
            aria-label={t("subAdmin.card.togglePassword")}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">{t("subAdmin.card.address")}:</span>{" "}
          {subAdmin.address}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">{t("subAdmin.card.branchId")}:</span>{" "}
          {subAdmin.branchId}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">
            {t("subAdmin.card.villageCity")}:
          </span>{" "}
          {villageCity}
        </p>
      </div>
      <div className="mt-4 flex justify-between space-x-4 w-full">
        <button
          onClick={() => onEdit(subAdmin.id)}
          className="flex-1 bg-[#4c76ba] text-white text-lg px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition"
        >
          {t("subAdmin.buttons.edit")}
        </button>
        <button
          onClick={() => onDelete(subAdmin.id)}
          className="flex-1 bg-[#d9534f] text-white text-lg px-4 py-2 rounded-lg shadow-md hover:bg-red-500 hover:shadow-lg transition"
        >
          {t("subAdmin.buttons.delete")}
        </button>
      </div>
    </div>
  );
};

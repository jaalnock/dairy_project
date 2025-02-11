// src/components/LanguageToggle.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "mr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[1000]">
      <button
        onClick={toggleLanguage}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        {i18n.language === "en" ? "मराठी" : "English"}
      </button>
    </div>
  );
};

export default LanguageToggle;

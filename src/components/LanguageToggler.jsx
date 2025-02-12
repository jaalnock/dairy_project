import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageToggler = ({ isMobile = false }) => {
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = () => {
    const newLang = i18n.language === "en" ? "mr" : "en";
    i18n.changeLanguage(newLang);
  };

  // Only internal styling related to the toggler's appearance
  return (
    <div className="bg-gray-100/80 rounded-full shadow-inner">
      <div
        className={`relative flex items-center ${
          isMobile ? "w-[100px] h-7" : "w-[140px] h-8"
        }`}
      >
        {/* Sliding Background */}
        <div
          className={`
            absolute 
            bg-gradient-to-r from-blue-500 to-blue-600
            rounded-full shadow-md transition-all duration-300 ease-in-out
            ${isMobile ? "w-[47px] h-6" : "w-[66px] h-7"}
            ${
              isMobile
                ? i18n.language === "en"
                  ? "left-0.5"
                  : "left-[51px]"
                : i18n.language === "en"
                ? "left-0.5"
                : "left-[72px]"
            }
          `}
        />

        {/* Language Buttons */}
        <button
          onClick={handleToggleLanguage}
          className={`
            relative z-10 flex items-center justify-center
            rounded-full font-medium transition-colors duration-300
            ${isMobile ? "w-[47px] h-6 text-xs" : "w-[66px] h-7 text-sm"}
            ${
              i18n.language === "en"
                ? "text-white"
                : "text-gray-600 hover:text-gray-900"
            }
          `}
        >
          <span className="tracking-wide">{t("navbar.language.english")}</span>
        </button>

        <button
          onClick={handleToggleLanguage}
          className={`
            relative z-10 flex items-center justify-center
            rounded-full font-medium transition-colors duration-300
            ${isMobile ? "w-[47px] h-6 text-xs" : "w-[66px] h-7 text-sm"}
            ${
              i18n.language === "mr"
                ? "text-white"
                : "text-gray-600 hover:text-gray-900"
            }
          `}
        >
          <span>{t("navbar.language.marathi")}</span>
        </button>
      </div>
    </div>
  );
};

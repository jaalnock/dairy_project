import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadout } from "./variants2";
import logoImage from "../assets/Borgave_Logo_BG_Removed.png";
import { useTranslation } from "react-i18next";

// NavLink component for navigation links
const NavLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:text-blue-600 px-4 py-2 text-base font-medium transition-colors duration-200 ${className}`}
  >
    {children}
  </Link>
);

// Main Navbar component
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = () => {
    const newLang = i18n.language === "en" ? "mr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-white shadow-lg relative w-full top-0 z-50 mb-0">
      <motion.div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadout("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className="flex items-center h-16"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src={logoImage}
              alt="logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            {/* Enhanced Language Toggle for Desktop */}
            <div className="relative inline-block">
              <div className="bg-gray-100/80 backdrop-blur-sm p-1 rounded-full shadow-inner">
                <div className="relative flex items-center w-[140px] h-8">
                  {/* Sliding Background */}
                  <div
                    className={`
                      absolute w-[66px] h-7 
                      bg-gradient-to-r from-blue-500 to-blue-600
                      rounded-full shadow-md transition-all duration-300 ease-in-out
                      ${i18n.language === "en" ? "left-0.5" : "left-[72px]"}
                    `}
                  />

                  {/* Language Buttons */}
                  <button
                    onClick={handleToggleLanguage}
                    className={`
                      relative z-10 flex items-center justify-center
                      w-[66px] h-7 rounded-full font-medium text-sm
                      transition-colors duration-300
                      ${
                        i18n.language === "en"
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    <span className="tracking-wide">
                      {t("navbar.language.english")}
                    </span>
                  </button>

                  <button
                    onClick={handleToggleLanguage}
                    className={`
                      relative z-10 flex items-center justify-center
                      w-[66px] h-7 rounded-full font-medium text-sm
                      transition-colors duration-300
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
            </div>

            <NavLink to="/">{t("navbar.links.home")}</NavLink>
            <NavLink to="/products">{t("navbar.links.products")}</NavLink>
            <NavLink to="/about-us">{t("navbar.links.aboutUs")}</NavLink>
            <NavLink to="/contact-us">{t("navbar.links.contactUs")}</NavLink>

            {/* Login Button */}
            <NavLink
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {t("navbar.links.login")}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto flex items-center space-x-2">
            {/* Enhanced Language Toggle for Mobile */}
            <div className="relative inline-block">
              <div className="bg-gray-100/80 p-0.5 rounded-full shadow-inner">
                <div className="relative flex items-center w-[100px] h-7">
                  <div
                    className={`
                      absolute w-[47px] h-6 
                      bg-gradient-to-r from-blue-500 to-blue-600
                      rounded-full shadow-md transition-all duration-300 ease-in-out
                      ${i18n.language === "en" ? "left-0.5" : "left-[51px]"}
                    `}
                  />
                  <button
                    onClick={handleToggleLanguage}
                    className={`
                      relative z-10 flex items-center justify-center
                      w-[47px] h-6 rounded-full font-medium text-xs
                      transition-colors duration-300
                      ${
                        i18n.language === "en"
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    {t("navbar.language.english")}
                  </button>
                  <button
                    onClick={handleToggleLanguage}
                    className={`
                      relative z-10 flex items-center justify-center
                      w-[47px] h-6 rounded-full font-medium text-xs
                      transition-colors duration-300
                      ${
                        i18n.language === "mr"
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    {t("navbar.language.marathi")}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-4 bg-white shadow-md grid grid-cols-2 gap-4">
            <NavLink to="/" className="text-center">
              {t("navbar.links.home")}
            </NavLink>
            <NavLink to="/products" className="text-center">
              {t("navbar.links.products")}
            </NavLink>
            <NavLink to="/about-us" className="text-center">
              {t("navbar.links.aboutUs")}
            </NavLink>
            <NavLink to="/contact-us" className="text-center">
              {t("navbar.links.contactUs")}
            </NavLink>

            <NavLink
              to="/login"
              className="bg-[#4c76ba] text-white text-center py-2 rounded-md hover:bg-blue-700 transition col-span-2"
            >
              {t("navbar.links.login")}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

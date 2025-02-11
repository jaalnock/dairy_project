import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadout } from "./variants2";
import logoImage from "../assets/Borgave_Logo_BG_Removed.png";
import { useTranslation } from "react-i18next";
import { LanguageToggler } from "./LanguageToggler";

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
  const { t } = useTranslation();

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
            {/* Language Toggler for Desktop */}
            <LanguageToggler isMobile={false} />

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
            {/* Language Toggler for Mobile */}
            <LanguageToggler isMobile={true} />

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

export default Navbar;

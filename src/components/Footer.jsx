import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadout } from "./variants2";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-12 mt-0 w-full">
      <motion.div
        variants={fadout("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Store Info */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              {t("footer.companyName")}
            </h3>
            <p className="text-lg text-gray-300">{t("footer.tagline")}</p>
            <p className="text-sm text-gray-400 mt-4">
              {t("footer.copyright")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="text-base text-gray-300 space-y-4">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  {t("footer.quickLinks.home")}
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  {t("footer.quickLinks.products")}
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  {t("footer.quickLinks.aboutUs")}
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  {t("footer.quickLinks.contactUs")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {t("footer.social.title")}
            </h3>
            <div className="flex space-x-6 justify-center items-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300"
                aria-label={t("footer.social.facebook")}
              >
                <FaFacebookF className="w-8 h-8" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300"
                aria-label={t("footer.social.twitter")}
              >
                <FaTwitter className="w-8 h-8" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300"
                aria-label={t("footer.social.instagram")}
              >
                <FaInstagram className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons from react-icons
import { motion } from "framer-motion";
import { fadout } from "./variants2";
export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-0 w-full">
      <motion.div
        variants={fadout("up", 0.2)} // Apply animation to the logo
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Store Info */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Borgave Dugdhalay
            </h3>
            <p className="text-lg text-gray-300">
              Bringing the best dairy products straight from the farm to your
              home.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              &copy; 2025 Dairy Fresh Store. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="text-base text-gray-300 space-y-4">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Follow Us
            </h3>
            <div className="flex space-x-6 justify-center items-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300"
              >
                <FaFacebookF className="w-8 h-8" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300"
              >
                <FaTwitter className="w-8 h-8" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300"
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


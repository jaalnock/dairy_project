import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

export const ProductCard = ({ product , selectedBranch, categoryId}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    const id = product._id ; 
    navigate("/products/" + `${selectedBranch}/${categoryId}/${id}`, {state : product});
  };

  const handleAddToCart = (e) => {
    // Prevent click from propagating to the card container
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="w-full sm:max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer transition-transform"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative h-48">
        <img
          src={product?.productImage}
          alt={product?.productName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 py-3">
        {/* Product Name */}
        <h3 className="font-bold text-lg mb-2">{product.productName}</h3>

        {/* Ask to peers whether this field should be kept or not */}
        {/* <span>Total Remaining: {product.quantity} packets</span> */}
        {/* Price and Stock Status */}
        <div className="flex justify-between items-center mb-3 mt-2">
          <span className="text-gray-700 text-sm">
            
             ${product.productPrice}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs ${
              product.productInstock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.productInstock
              ? t("products.productCard.inStock")
              : t("products.productCard.outOfStock")}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <button
            onClick={handleClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm py-1 sm:py-2 px-3 rounded transition-colors duration-200"
          >
            {t("products.productCard.viewDetails")}
          </button>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm py-1 sm:py-2 px-3 rounded transition-colors duration-200"
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

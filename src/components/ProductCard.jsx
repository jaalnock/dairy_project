import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../context/CartContext";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    // Prevent the event from bubbling up if needed
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Product Image */}
      <div className="relative h-48">
        <img
          src={product?.imageUrl}
          alt={product?.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 py-4">
        {/* Product Name */}
        <h3 className="font-bold text-xl mb-2">{product.name}</h3>

        {/* Price and Stock Status */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">
            {t("products.productCard.price")} ${product.price}
          </span>
          <span
            className={`px-2 py-1 rounded text-sm ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock
              ? t("products.productCard.inStock")
              : t("products.productCard.outOfStock")}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          {/* View Details Button */}
          <button
            onClick={handleClick}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t("products.productCard.viewDetails")}
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

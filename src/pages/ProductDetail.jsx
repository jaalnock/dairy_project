import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "../config";
import { CartContext } from "../context/CartContext";

export const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchedProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(fetchedProduct);
  }, [id]);

  const handleBackClick = () => {
    navigate("/products");
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  if (!product) return <div>{t("products.productDetails.loading")}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-12 relative">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-500 text-white transition duration-300 w-12 h-12 rounded-full flex items-center justify-center"
        aria-label={t("products.productDetails.backToProducts")}
      >
        <span className="text-xl">&larr;</span>
      </button>

      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Product Image */}
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-8 text-gray-800">
          <h2 className="text-4xl font-semibold text-blue-600 mb-4">
            {product.name}
          </h2>

          {/* Status Badge */}
          <div className="mt-2 mb-4">
            <span
              className={`text-xs font-semibold py-1 px-4 rounded-full shadow-md ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock
                ? t("products.productDetails.inStock")
                : t("products.productDetails.outOfStock")}
            </span>
          </div>

          <p className="text-lg text-gray-700 mt-3">{product.description}</p>

          {/* Specifications */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {t("products.productDetails.specifications")}
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>{t("products.productDetails.snf")}:</strong>{" "}
                {product.snf || t("products.productDetails.notAvailable")}
              </li>
              <li>
                <strong>{t("products.productDetails.fatContent")}:</strong>{" "}
                {product.fatContent ||
                  t("products.productDetails.notAvailable")}
              </li>
              <li>
                <strong>{t("products.productDetails.quantity")}:</strong>{" "}
                {product.quantity || t("products.productDetails.notAvailable")}
              </li>
            </ul>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-green-600 mt-6">
            ${product.price}
          </p>

          {/* Status Message */}
          <p className="text-sm text-gray-500 mt-1">
            {t("products.productDetails.availability")}:{" "}
            {product.inStock
              ? t("products.productDetails.inStock")
              : t("products.productDetails.outOfStock")}
          </p>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`${
                product.inStock
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              } text-white px-6 py-3 rounded-full font-semibold transition-all duration-300`}
            >
              AddToCart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

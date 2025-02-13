import React, { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";

export const Card = ({ product }) => {
  const { handleAddToCart } = useContext(ShoppingCartContext);

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
      <p className="text-gray-500">SNF: {product.snf} | Fat: {product.fatContent}</p>

      {product.inStock ? (
        <button
          onClick={() => handleAddToCart(product.id)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      ) : (
        <p className="text-red-500 mt-2">Out of Stock</p>
      )}
    </div>
  );
};

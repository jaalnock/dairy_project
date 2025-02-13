import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // imported for cart title

export const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEnquireClick = () => {
    navigate("/contact-us");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        <ShoppingCart className="inline-block h-8 w-8 mr-2" />
        Cart title
      </h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty!!!</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-1">
                      {t("cart.price") || "Price"}: ${item.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={handleEnquireClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              EnquireUs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

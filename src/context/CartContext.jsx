import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedQuantity === product.selectedQuantity
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.selectedQuantity === product.selectedQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, selectedQuantity) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.selectedQuantity === selectedQuantity)
      )
    );
  };

  const increaseQuantity = (productId, selectedQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.selectedQuantity === selectedQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId, selectedQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.selectedQuantity === selectedQuantity
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, { useState, useEffect } from "react";

export const TransactionCard = ({
  transaction,
  onEdit,
  onDelete,
  predefinedProducts,
}) => {
  const [productName, setProductName] = useState("Loading...");
  const [productPrice, setProductPrice] = useState(null);

  useEffect(() => {
    console.log("Predefined Products:", predefinedProducts); // Debugging line

    if (Array.isArray(predefinedProducts) && predefinedProducts.length > 0) {
      const product = predefinedProducts.find(
        (product) => product.id === transaction.productId
      );

      if (product) {
        setProductName(product.name);
        setProductPrice(product.price);
      } else {
        setProductName("No products available");
        setProductPrice(null);
      }
    } else {
      setProductName("No products available");
      setProductPrice(null);
    }
  }, [transaction.productId, predefinedProducts]);

  // Calculate the total price based on the quantity and product price
  const totalPrice =
    productPrice !== null
      ? (productPrice * transaction.quantity).toFixed(2)
      : "N/A";

  return (
    <div className="bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-6 space-y-6 border border-gray-300 text-center transition-transform transform hover:scale-105 hover:shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 hover:text-[#4c76ba] transition">
        Transaction ID: {transaction.id}
      </h3>
      <div className="w-full text-left space-y-3">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Product:</span> {productName}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Price:</span> $
          {totalPrice !== "N/A" ? totalPrice : "N/A"}
        </p>
        <div className="relative flex items-center text-lg text-gray-700">
          <span className="font-semibold">Quantity:</span>
          <span className="ml-2">{transaction.quantity}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between space-x-4 w-full">
        <button
          onClick={() => onEdit(transaction.id)}
          className="flex-1 bg-[#4c76ba] text-white text-lg px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-xl transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="flex-1 bg-[#d9534f] text-white text-lg px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-xl transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

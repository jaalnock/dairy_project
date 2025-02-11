import React, { useState, useEffect } from "react";

export const TransactionForm = ({
  isEditing,
  handleSaveTransaction,
  setIsFormOpen,
  editingTransaction,
}) => {
  const [formData, setFormData] = useState({
    products: [],
    netTotalPrice: 0,
  });

  const [availableProducts, setAvailableProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setAvailableProducts(storedProducts);
  }, []);

  // Load editing transaction (if editing)
  useEffect(() => {
    if (isEditing && editingTransaction) {
      setFormData({
        products: editingTransaction.products || [],
        netTotalPrice: editingTransaction.netTotalPrice || 0,
      });
    }
  }, [isEditing, editingTransaction]);

  // Handle product selection change
  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...formData.products];

    if (name === "productId") {
      const selectedProduct = availableProducts.find((p) => p.id === value);
      updatedProducts[index] = {
        ...updatedProducts[index],
        productId: value,
        name: selectedProduct ? selectedProduct.name : "",
        price: selectedProduct ? selectedProduct.price : 0,
        quantity: updatedProducts[index]?.quantity || "", // Clear input initially
      };
    } else if (name === "quantity") {
      // Allow empty input temporarily
      const newQuantity = value === "" ? "" : Math.max(parseInt(value, 10) || 0, 0);
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: newQuantity,
      };
    }

    const totalPrice = updatedProducts.reduce(
      (sum, product) => sum + (product.price * (product.quantity || 0)),
      0
    );

    setFormData({ products: updatedProducts, netTotalPrice: totalPrice });
  };

  // Add new product row
  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { productId: "", name: "", price: 0, quantity: "" }, // Set quantity as empty
      ],
    });
  };

  // Remove product row
  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    const totalPrice = updatedProducts.reduce(
      (sum, product) => sum + product.price * (product.quantity || 0),
      0
    );
    setFormData({ products: updatedProducts, netTotalPrice: totalPrice });
  };

  // Save Transaction
  const handleSubmit = () => {
    if (formData.products.length === 0) {
      alert("Please add at least one product!");
      return;
    }
    handleSaveTransaction(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Transaction" : "New Transaction"}
        </h3>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto max-h-[65vh] pr-2">
          {formData.products.map((product, index) => (
            <div key={index} className="mb-4 border p-3 rounded-md">
              <label className="block mb-1">Product</label>
              <select
                name="productId"
                value={product.productId}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a product</option>
                {availableProducts.length > 0 ? (
                  availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ${p.price}
                    </option>
                  ))
                ) : (
                  <option disabled>No products available</option>
                )}
              </select>

              <label className="block mt-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                min="0"
                className="w-full border p-2 rounded"
              />

              <p className="mt-2 text-gray-600">
                Price: ${product.price} | Total: ${product.price * (product.quantity || 0)}
              </p>

              {formData.products.length > 1 && (
                <button
                  onClick={() => removeProduct(index)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
          >
            + Add Another Product
          </button>

          <p className="text-lg font-bold mt-4">Net Total Price: ${formData.netTotalPrice}</p>
        </div>

        {/* Buttons - Always Visible */}
        <div className="mt-4 flex justify-between space-x-4">
          <button
            onClick={() => setIsFormOpen(false)}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#2c447f] text-white px-4 py-2 rounded-lg hover:bg-[#1b2d5b] transition"
            >
            {isEditing ? "Update" : "Save"} Loan
          </button>
        </div>
      </div>
    </div>
  );
};

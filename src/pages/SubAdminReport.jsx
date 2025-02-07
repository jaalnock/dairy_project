import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export const SubAdminReport = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setProducts(storedProducts);
    setTransactions(storedTransactions);
  }, []);

  // Calculate total cost and revenue
  const totalCost = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.netTotalPrice, 0);
  const profitLoss = totalRevenue - totalCost;

  // Generate and download the Excel report
  const downloadReport = () => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Product Details
    const productSheetData = [
      ["Product ID", "Product Name", "Quantity", "Price", "Total Cost"],
      ...products.map((product) => [
        product.id || "N/A",
        product.name,
        product.quantity,
        `$${product.price}`,
        `$${(product.price * product.quantity).toFixed(2)}`,
      ]),
    ];
    const productSheet = XLSX.utils.aoa_to_sheet(productSheetData);
    XLSX.utils.book_append_sheet(wb, productSheet, "Product Details");

    // Sheet 2: Transactions (Without Date & Items Purchased)
    const transactionSheetData = [
      ["Transaction ID", "Net Total Price"],
      ...transactions.map((transaction) => [
        transaction.id,
        `$${transaction.netTotalPrice.toFixed(2)}`,
      ]),
    ];
    const transactionSheet = XLSX.utils.aoa_to_sheet(transactionSheetData);
    XLSX.utils.book_append_sheet(wb, transactionSheet, "Transactions");

    // Sheet 3: Financial Summary
    const summarySheetData = [
      ["Description", "Amount"],
      ["Total Purchase Cost", `$${totalCost.toFixed(2)}`],
      ["Total Revenue", `$${totalRevenue.toFixed(2)}`],
      ["Profit/Loss", profitLoss >= 0 ? `Profit: $${profitLoss.toFixed(2)}` : `Loss: $${Math.abs(profitLoss).toFixed(2)}`],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Financial Summary");

    // Generate Excel file
    XLSX.writeFile(wb, "Financial_Report.xlsx");
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#2c447f]">Report</h2>

      {/* Product Purchases Table */}
      <h3 className="text-2xl font-semibold mb-4">Product Purchases</h3>
      <table className="w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Product ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{product.id || "N/A"}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-4 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Transactions Table */}
      <h3 className="text-2xl font-semibold mb-4">Transactions</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Net Total Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{transaction.id}</td>
                <td className="border p-2">${transaction.netTotalPrice.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border p-4 text-center text-gray-500">
                No transactions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Profit or Loss Calculation */}
      <div className="mt-6 p-4 bg-gray-100 text-center text-lg font-semibold rounded-lg">
        <p>Total Purchase Cost: ${totalCost.toFixed(2)}</p>
        <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
        <p className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
          {profitLoss >= 0 ? `Profit: $${profitLoss.toFixed(2)}` : `Loss: $${Math.abs(profitLoss).toFixed(2)}`}
        </p>
      </div>

      {/* Download Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={downloadReport}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg"
        >
          📥 Download Excel Report
        </button>
      </div>
    </div>
  );
};

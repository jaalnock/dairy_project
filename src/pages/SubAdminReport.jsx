import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export const SubAdminReport = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reportType, setReportType] = useState("daily");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setProducts(storedProducts);
    setTransactions(storedTransactions);
  }, []);

  const filterByDate = (data, days) => {
    const now = new Date();
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
  };

  const filteredTransactions =
    reportType === "daily"
      ? filterByDate(transactions, 1)
      : reportType === "weekly"
      ? filterByDate(transactions, 7)
      : filterByDate(transactions, 30);

  const filteredProducts =
    reportType === "daily"
      ? filterByDate(products, 1)
      : reportType === "weekly"
      ? filterByDate(products, 7)
      : filterByDate(products, 30);

  const totalCost = filteredProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const totalRevenue = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.netTotalPrice,
    0
  );
  const profitLoss = totalRevenue - totalCost;

  const downloadReport = () => {
    const wb = XLSX.utils.book_new();

    const productSheetData = [
      ["Product ID", "Product Name", "Quantity", "Price", "Total Cost"],
      ...filteredProducts.map((product) => [
        product.id || "N/A",
        product.name,
        product.quantity,
        `$${product.price}`,
        `$${(product.price * product.quantity).toFixed(2)}`,
      ]),
    ];
    const productSheet = XLSX.utils.aoa_to_sheet(productSheetData);
    XLSX.utils.book_append_sheet(wb, productSheet, "Product Details");

    const transactionSheetData = [
      ["Transaction ID", "Net Total Price"],
      ...filteredTransactions.map((transaction) => [
        transaction.id,
        `$${transaction.netTotalPrice.toFixed(2)}`,
      ]),
    ];
    const transactionSheet = XLSX.utils.aoa_to_sheet(transactionSheetData);
    XLSX.utils.book_append_sheet(wb, transactionSheet, "Transactions");

    const summarySheetData = [
      ["Description", "Amount"],
      ["Total Purchase Cost", `$${totalCost.toFixed(2)}`],
      ["Total Revenue", `$${totalRevenue.toFixed(2)}`],
      [
        "Profit/Loss",
        profitLoss >= 0
          ? `Profit: $${profitLoss.toFixed(2)}`
          : `Loss: $${Math.abs(profitLoss).toFixed(2)}`,
      ],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Financial Summary");

    XLSX.writeFile(wb, `Financial_Report_${reportType}.xlsx`);
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#2c447f]">
        Report
      </h2>

      <div className="mb-6 flex justify-center space-x-4">
        {["daily", "weekly", "monthly"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg font-semibold ${
              reportType === type
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setReportType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </button>
        ))}
      </div>

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{product.id || "N/A"}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
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

      <h3 className="text-2xl font-semibold mb-4">Transactions</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Net Total Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{transaction.id}</td>
                <td className="border p-2">
                  ${transaction.netTotalPrice.toFixed(2)}
                </td>
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

      <div className="mt-6 p-4 bg-gray-100 text-center text-lg font-semibold rounded-lg">
        <p>Total Purchase Cost: ${totalCost.toFixed(2)}</p>
        <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
        <p
          className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}
        >
          {profitLoss >= 0
            ? `Profit: $${profitLoss.toFixed(2)}`
            : `Loss: $${Math.abs(profitLoss).toFixed(2)}`}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={downloadReport}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg"
        >
          📥 Download {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Excel Report
        </button>
      </div>
    </div>
  );
};

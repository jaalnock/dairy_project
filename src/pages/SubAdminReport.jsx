import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";

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

  // Framer Motion variants for report type buttons and table rows
  const buttonVariants = {
    selected: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
    unselected: {},
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#2c447f]">
          Report
        </h2>

        {/* Report Type Selector */}
        <div className="mb-8 flex justify-center space-x-4">
          {["daily", "weekly", "monthly"].map((type) => (
            <motion.button
              key={type}
              onClick={() => setReportType(type)}
              variants={buttonVariants}
              animate={reportType === type ? "selected" : "unselected"}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                reportType === type
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Report
            </motion.button>
          ))}
        </div>

        {/* Product Purchases Table */}
        <h3 className="text-2xl font-semibold mb-4">Product Purchases</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3">Product ID</th>
                <th className="border p-3">Product Name</th>
                <th className="border p-3">Quantity</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Total Cost</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <motion.tr
                      key={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-center hover:bg-gray-100 transition"
                    >
                      <td className="border p-3">{product.id || "N/A"}</td>
                      <td className="border p-3">{product.name}</td>
                      <td className="border p-3">{product.quantity}</td>
                      <td className="border p-3">${product.price}</td>
                      <td className="border p-3">
                        ${(product.price * product.quantity).toFixed(2)}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <td
                      colSpan="5"
                      className="border p-4 text-center text-gray-500"
                    >
                      No products available.
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Transactions Table */}
        <h3 className="text-2xl font-semibold mb-4">Transactions</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3">Transaction ID</th>
                <th className="border p-3">Net Total Price</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-center hover:bg-gray-100 transition"
                    >
                      <td className="border p-3">{transaction.id}</td>
                      <td className="border p-3">
                        ${transaction.netTotalPrice.toFixed(2)}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <td
                      colSpan="2"
                      className="border p-4 text-center text-gray-500"
                    >
                      No transactions available.
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center text-lg font-semibold">
          <p>Total Purchase Cost: ${totalCost.toFixed(2)}</p>
          <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
          <p className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
            {profitLoss >= 0
              ? `Profit: $${profitLoss.toFixed(2)}`
              : `Loss: $${Math.abs(profitLoss).toFixed(2)}`}
          </p>
        </div>

        {/* Download Report Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={downloadReport}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 text-lg transition transform duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <span role="img" aria-label="download">
              📥
            </span>
            <span>
              Download{" "}
              {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Excel
              Report
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubAdminReport;

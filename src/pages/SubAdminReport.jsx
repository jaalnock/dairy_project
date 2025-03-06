import React, { useState } from "react";
import axios from "axios";

export const SubAdminReport = () => {
  const [reportType, setReportType] = useState("daily");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("farmersLoan");

  const BASE_URL = "http://localhost:5173/api/v1";

  const downloadReport = async (url, filename) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}${url}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Farmers' Reports
      </h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "farmersLoan"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("farmersLoan")}
        >
          Farmers' Loan Report
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "loanByMobile"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("loanByMobile")}
        >
          Loan Report by Mobile
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "farmersTransaction"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("farmersTransaction")}
        >
          Farmers' Transaction Report
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "transactionByMobile"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("transactionByMobile")}
        >
          Transaction Report by Mobile
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "productTransaction"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("productTransaction")}
        >
          Product Transaction Report
        </button>
      </div>

      {activeTab === "farmersLoan" && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Farmers' Loan Report
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Report Type:
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>
          <button
            onClick={() =>
              downloadReport(
                `/loan/subAdmin/loans/report?reportType=${reportType}`,
                `${reportType}_Farmers_Loan_Report.xlsx`
              )
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download Farmers' Loan Report"}
          </button>
        </div>
      )}

      {activeTab === "loanByMobile" && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loan Report by Mobile Number
          </h3>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <button
            onClick={() => {
              if (mobileNumber) {
                downloadReport(
                  `/loan/subAdmin/loans/report/${mobileNumber}`,
                  `Loan_Report_${mobileNumber}.xlsx`
                );
              } else {
                alert("Please enter a mobile number");
              }
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading
              ? "Downloading..."
              : "Download Loan Report by Mobile Number"}
          </button>
        </div>
      )}

      {activeTab === "farmersTransaction" && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Farmers' Milk Transaction Report
          </h3>
          <button
            onClick={() =>
              downloadReport(
                "/milk/subAdmin/excel/branch-transactionsv",
                "Farmers_Transaction_Report.xlsx"
              )
            }
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading
              ? "Downloading..."
              : "Download Farmers' Transaction Report"}
          </button>
        </div>
      )}

      {activeTab === "transactionByMobile" && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Milk Transaction Report by Mobile Number
          </h3>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <button
            onClick={() => {
              if (mobileNumber) {
                downloadReport(
                  `/milk/subAdmin/farmer/excel/${mobileNumber}`,
                  `Transaction_Report_${mobileNumber}.xlsx`
                );
              } else {
                alert("Please enter a mobile number");
              }
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading
              ? "Downloading..."
              : "Download Transaction Report by Mobile Number"}
          </button>
        </div>
      )}
      {activeTab === "productTransaction" && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Product Transaction Report
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Report Type:
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>
          <button
            onClick={() =>
              downloadReport(
                `/transaction/subAdmin/transactions/report?reportType=${reportType}`,
                `${reportType}_Product_Transaction_Report.xlsx`
              )
            }
            className="w-full bg-black hover:bg-black-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download Product Transaction Report"}
          </button>
        </div>
      )}
    </div>
  );
};

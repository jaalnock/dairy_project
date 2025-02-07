import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);

  // Function to simulate fetching report data based on the report type
  const fetchReportData = (type) => {
    const data = {
      daily: {
        "Branch 1": 5000,
        "Branch 2": -3000, // Loss
        "Branch 3": 10000,
      },
      weekly: {
        "Branch 1": 15000,
        "Branch 2": -7000, // Loss
        "Branch 3": 25000,
      },
      monthly: {
        "Branch 1": 50000,
        "Branch 2": -20000, // Loss
        "Branch 3": 70000,
      },
    };

    return data[type] || {};
  };

  // Extract the query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const reportType = queryParams.get("type");

  useEffect(() => {
    if (reportType) {
      const data = fetchReportData(reportType);
      setReportData(data);
    }
  }, [reportType]);

  // Calculate the total (sum of all branch values)
  const calculateTotal = () => {
    if (!reportData) return 0;
    return Object.values(reportData).reduce((acc, curr) => acc + curr, 0);
  };

  const handleBranchClick = (branch) => {
    navigate(`/branch-details?branch=${branch}`);
  };

  // Dynamic hover style state
  const [hoveredBranch, setHoveredBranch] = useState(null);

  // Dynamic box shadow logic on hover
  const boxShadowStyle = hoveredBranch
    ? "0 4px 20px rgba(0, 0, 0, 0.15)"
    : "0 10px 20px rgba(0, 0, 0, 0.1)";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d0e1f9] to-[#a8c0ff] flex flex-col p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
        {reportType?.charAt(0).toUpperCase() + reportType?.slice(1)} Report
      </h1>

      {reportData ? (
        <div className="space-y-6">
          {/* Branches List */}
          <div className="space-y-4">
            {Object.keys(reportData).map((branch) => (
              <div
                key={branch}
                className="flex justify-between items-center cursor-pointer bg-white p-6 rounded-lg transition-all duration-300 transform hover:bg-blue-100"
                style={{
                  boxShadow: hoveredBranch === branch ? boxShadowStyle : "none",
                }}
                onClick={() => handleBranchClick(branch)}
                onMouseEnter={() => setHoveredBranch(branch)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                <span className="text-xl font-medium text-gray-700">{branch}</span>
                <span
                  className={`text-xl font-semibold ${
                    reportData[branch] < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {reportData[branch] < 0
                    ? `Loss: ₹${Math.abs(reportData[branch])}`
                    : `Profit: ₹${reportData[branch]}`}
                </span>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-8 p-8 rounded-lg shadow-xl bg-white opacity-90 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Total Earnings/Expenditure
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Here’s the overall summary based on the data collected for the
              selected report type.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xl text-gray-800">Total Amount:</span>
              <div className="text-2xl font-semibold text-blue-700">
                ₹{calculateTotal()}
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              {calculateTotal() < 0
                ? "It seems there's a loss overall. Take necessary actions."
                : "Great job! You're in profit."}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-center mt-6">No report data available.</p>
      )}
    </div>
  );
};



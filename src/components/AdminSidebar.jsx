import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/Borgave_Logo_BG_Removed.png";
import userProfile from "../assets/user_profile.png";

export const AdminSidebar = ({ isOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false); // Toggle dropdown

  // Close the dropdown if the user navigates to any other page
  useEffect(() => {
    // Close the dropdown if the current path isn't related to reports
    if (!location.pathname.includes("/reports")) {
      setShowReports(false);
    }
  }, [location]);

  const handleReportSelection = (reportType) => {
    navigate(`/reports?type=${reportType}`);
    setShowReports(false); // Close dropdown after selecting a report
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 bg-gradient-to-br from-[#d0e1f9] to-[#a8c0ff] z-50 h-screen text-white p-4 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-50 lg:w-74 flex flex-col justify-between`}
      >
        <div>
          {/* Company Logo & Name */}
          <div className="mb-6 flex items-center space-x-3">
            <img src={logoImage} alt="logo" className="w-10 h-10" />
            <h1 className="text-lg font-bold text-black">Borgave Dugdhalay</h1>
          </div>

          <ul className="text-left">
            {[{ name: "Home", path: "/admin" }, { name: "SubAdmin", path: "/admin/subadmin" }, { name: "Branch", path: "/admin/branch" }].map(
              (item) => (
                <li key={item.name} className="mb-4">
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-lg transition duration-200 ${
                      location.pathname === item.path
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-black hover:bg-gray-300"
                    }`}
                    onClick={() => setShowReports(false)} // Close dropdown when any link is clicked
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}

            {/* Reports Dropdown */}
            <li className="mb-4 relative">
              <button
                className="text-left px-3 w-full py-2 rounded-lg bg-[#8095b5] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onClick={() => setShowReports(!showReports)} // Toggle the dropdown
              >
                Reports   ▼
              </button>
              {showReports && (
                <div className="absolute left-0 mt-2 w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleReportSelection("daily")}
                  >
                    Daily Report
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleReportSelection("weekly")}
                  >
                    Weekly Report
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleReportSelection("monthly")}
                  >
                    Monthly Report
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-4 bg-gradient-to-br from-[#d6e4fc] to-[#b3c7f7] p-4 rounded-xl shadow-lg w-[85%]">
          <img
            src={userProfile}
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
          <div className="ml-5">
            <h3 className="text-base font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-700">Admin</p>
          </div>
        </div>

        {/* Close Button for Mobile */}
        <button
          className="lg:hidden mt-4 p-2 bg-gray-600 rounded text-white"
          onClick={() => setSidebarOpen(false)}
        >
          Close
        </button>
      </aside>
    </>
  );
};



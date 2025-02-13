import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "../assets/Borgave_Logo_BG_Removed.png";
import userProfile from "../assets/user_profile.png";
import { LanguageToggler } from "./LanguageToggler";
import { useAuth } from "../context/AuthContext.jsx"; 

export const AdminSidebar = ({ isOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showReports, setShowReports] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!location.pathname.includes("/admin/reports")) {
      setShowReports(false);
    }
  }, [location]);

  const handleReportSelection = (reportType) => {
    navigate(`/admin/reports?type=${reportType}`);
    setShowReports(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 bg-gradient-to-br from-[#d0e1f9] to-[#a8c0ff] z-50 h-screen text-white p-4 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-50 lg:w-74 flex flex-col`}
      >
        <div className="flex-1 mb-32">
          <div className="mb-6 flex items-center space-x-3">
            <img src={logoImage} alt="logo" className="w-10 h-10" />
            <h1 className="text-lg font-bold text-black">
              {t("adminSidebar.title")}
            </h1>
          </div>
          <ul className="text-left">
            {[
              { name: t("adminSidebar.menu.home"), path: "/admin" },
              {
                name: t("adminSidebar.menu.subAdmin"),
                path: "/admin/subadmin",
              },
              { name: t("adminSidebar.menu.branch"), path: "/admin/branch" },
            ].map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg transition duration-200 ${
                    location.pathname === item.path
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-black hover:bg-gray-300"
                  }`}
                  onClick={() => setShowReports(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li className="mb-4 relative">
              <button
                className="text-left px-3 w-full py-2 rounded-lg bg-[#8095b5] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onClick={() => setShowReports(!showReports)}
              >
                {t("adminSidebar.reports.title")} ▼
              </button>
              {showReports && (
                <div className="absolute left-0 mt-2 w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleReportSelection("daily")}
                  >
                    {t("adminSidebar.reports.daily")}
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleReportSelection("weekly")}
                  >
                    {t("adminSidebar.reports.weekly")}
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleReportSelection("monthly")}
                  >
                    {t("adminSidebar.reports.monthly")}
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className="absolute md:bottom-38 bottom-42 left-4 w-[85%] bg-gradient-to-br from-[#d6e4fc] to-[#b3c7f7] p-4 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              {t("adminSidebar.language.select")}
            </h3>
            <LanguageToggler isMobile={false} />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex flex-col items-center space-y-0 bg-gradient-to-br from-[#d6e4fc] to-[#b3c7f7] p-3 rounded-xl shadow-lg w-[85%]">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile}
              alt={t("adminSidebar.profile.userImageAlt")}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="ml-5">
              <h3 className="text-base font-semibold text-gray-900">
                {t("adminSidebar.profile.name")}
              </h3>
              <p className="text-sm text-gray-700">
                {t("adminSidebar.profile.role")}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full px-4 py-2 mt-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            {t("adminSidebar.buttons.logout")}
          </button>
        </div>

        <button
          className="lg:hidden mt-4 p-2 bg-gray-600 rounded text-white"
          onClick={() => setSidebarOpen(false)}
        >
          {t("adminSidebar.buttons.close")}
        </button>
      </aside>
    </>
  );
};

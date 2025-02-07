import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { Menu } from "lucide-react"; // For the hamburger icon

export const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when clicking outside
  const handleBackdropClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Hamburger Menu */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden opacity-50"
          onClick={handleBackdropClick}
        ></div>
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {/* Content of the page */}
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

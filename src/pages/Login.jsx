import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!role || !mobile || !password) {
      setError(t("login.errors.fillAllFields"));
      return;
    }

    // Mobile Number Validation (10-digit number only)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError(t("login.errors.invalidMobile"));
      return;
    }

    // Password Validation: Min 8 characters, at least one special character
    // const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   setError(t("login.errors.invalidPassword"));
    //   return;
    // }

    console.log("Login successful:", { role, mobile, password });

    login(role);

    // Redirect based on role
    if (role === "Admin") {
      navigate("/admin");
    } else if (role === "SubAdmin") {
      navigate("/subadmin");
    }

    // Clear form fields
    setRole("");
    setMobile("");
    setPassword("");
    setError("");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-96 max-w-full"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {t("login.title")}
        </h2>
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-6 text-sm">
            {error}
          </p>
        )}

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("login.form.roleLabel")}
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">{t("login.form.selectRole")}</option>
            <option value="Admin">{t("login.form.admin")}</option>
            <option value="SubAdmin">{t("login.form.subAdmin")}</option>
          </select>
        </div>

        {/* Mobile Number Input */}
        <div className="mb-6">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("login.form.mobileLabel")}
          </label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t("login.form.mobilePlaceholder")}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("login.form.passwordLabel")}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("login.form.passwordPlaceholder")}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#4c76ba] text-white py-3 rounded-lg shadow-md hover:bg-[#1b2d5b] transition duration-300"
        >
          {t("login.form.submitButton")}
        </button>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export const Login = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { role: savedRole, login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (savedRole === "Admin") {
      navigate("/admin");
    } else if (savedRole === "SubAdmin") {
      navigate("/subadmin");
    }
  }, [savedRole, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Basic validation
    if (!role || !mobile || !password) {
      setError(t("login.errors.fillAllFields"));
      return;
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError(t("login.errors.invalidMobile"));
      return;
    }

    setIsSubmitting(true);
    try {
      let response;
      if (role === "Admin") {
        response = await axios.post(
          "http://localhost:8000/api/v1/admin/login",
          { adminMobileNumber: mobile, adminPassword: password },
          { withCredentials: true }
        );
      } else if (role === "SubAdmin") {
        response = await axios.post(
          "http://localhost:8000/api/v1/subadmin/login",
          { mobileNumber: mobile, subAdminPassword: password },
          { withCredentials: true }
        );
        console.log(response);
        localStorage.setItem("response", JSON.stringify(response));
      }
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/admin/login",
      //   { adminMobileNumber: mobile, adminPassword: password },
      //   { withCredentials: true }
      // );
      console.log(response);

      if (response.status == 404) {
        setError("Invalid Credentials");
      }
      if (response.status == 500) {
        setError("Internal Server Error");
      }
      console.log("Login successful:", response);
      login(role);
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "SubAdmin") {
        navigate("/subadmin");
      }
    } catch (err) {
      console.log(err.response?.status);
      if (err?.response?.status === 401) {
        setError(t("login.errors.invalidCredentials") || "Invalid Credentials");
      } else if (err?.response?.status === 404) {
        setError(
          role === "Admin"
            ? t("login.errors.adminNotFound") || "Admin Not Found"
            : t("login.errors.subAdminNotFound") || "SubAdmin Not Found"
        );
      } else if (err?.response?.status === 500) {
        setError(t("login.errors.internalServer") || "Internal Server Error");
      } else {
        setError(
          t("login.errors.unknownError") || "Login failed. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
      // Clear form fields after submission
      setRole("");
      setMobile("");
      setPassword("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center w-full h-screen overflow-y-auto bg-gradient-to-br from-white to-blue-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl p-10 w-96 max-w-full"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          {t("login.title")}
        </h2>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-100 text-red-600 p-3 rounded mb-6 text-sm text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

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

        <div className="mb-6">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("login.form.mobileLabel")}
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t("login.form.mobilePlaceholder")}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting
            ? t("login.form.submitting") || "Logging in..."
            : t("login.form.submitButton")}
        </button>
      </form>
    </motion.div>
  );
};

export default Login;

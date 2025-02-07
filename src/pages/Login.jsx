import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!role || !mobile || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Mobile Number Validation (10-digit number only)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Password Validation: Min 8 characters, at least one special character
    const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one special character."
      );
      return;
    }

    console.log("Login successful:", { role, mobile, password });

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
          Login
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
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="SubAdmin">SubAdmin</option>
          </select>
        </div>

        {/* Mobile Number Input */}
        <div className="mb-6">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
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
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#4c76ba] text-white py-3 rounded-lg shadow-md hover:bg-[#1b2d5b] transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

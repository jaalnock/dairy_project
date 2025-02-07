import React, { useState } from "react";
import inquiryImage from "../assets/Inquiry_image.png";
import axios from "axios";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtpInput(e.target.value);
  };

  const sendOtp = () => {
    if (formData.mobile.length === 10) {
      axios
        .post("http://localhost:8000/api/v1/online-customer/send-sms", {
          phoneNumber: formData.mobile,
          name: formData.name,
          address: formData.address,
        })
        .then((response) => {
          console.log("Response:", response.data);
          setOtpSent(true);
          setOtp("123456"); // Hardcoded OTP for now
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const verifyOtp = () => {
    if (otpInput === otp) {
      setOtpVerified(true);
      setConfirmationMessage(
        "Thank you for reaching out! Your inquiry has been received successfully, and our team will get in touch with you shortly. Rest assured, we value your trust and are here to assist you every step of the way."
      );
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-auto min-h-screen overflow-y-auto py-10 px-6">
        <div className="w-full sm:max-w-5xl bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            Contact Us
          </h1>

          {/* Main Form and Image Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left Side - Image */}
            <div className="flex-1">
              <img
                src={inquiryImage}
                alt="Contact Us"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1">
              {!otpVerified ? (
                <form>
                  {/* Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      required
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Mobile No. */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Mobile No.
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                      required
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Send OTP Button */}
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                    >
                      Send OTP
                    </button>
                  ) : (
                    <div className="mt-6">
                      {/* OTP Input */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          value={otpInput}
                          onChange={handleOtpChange}
                          placeholder="Enter the OTP"
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <div className="mt-6 text-center">
                  <h2 className="text-lg font-semibold text-blue-700">
                    {confirmationMessage}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg">
          {/* Shop Information and Map */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="w-full sm:max-w-xl">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Our Contact Information
              </h3>
              <p className="mb-4">
                <strong>Main Branch:</strong>
                <span className="block">
                  123 Main Street, City Center, Country
                </span>
              </p>
              <p className="mb-4">
                <strong>Second Branch:</strong>
                <span className="block">
                  456 Second Avenue, Suburban Area, Country
                </span>
              </p>
              <p className="mb-4">
                <strong>Third Branch:</strong>
                <span className="block">
                  789 Third Boulevard, Downtown, Country
                </span>
              </p>
              <p className="mb-4">
                <strong>Contact No.:</strong>
                <span className="block">+1234567890</span>
              </p>
            </div>

            <div className="w-full sm:max-w-xl">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Our Shop Locations
              </h3>
              <iframe
                width="100%"
                height="300"
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJE9on3F3HwoAR9fzzD5n4F4A&key=YOUR_API_KEY"
                title="Shop Locations"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



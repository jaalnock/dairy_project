import React, { useState } from "react";
import inquiryImage from "../assets/Inquiry_image.png";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const ContactUs = () => {
  const { t } = useTranslation();

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
      alert(t("contactUs.alert.invalidMobile"));
    }
  };

  const verifyOtp = () => {
    if (otpInput === otp) {
      setOtpVerified(true);
      setConfirmationMessage(t("contactUs.confirmation"));
    } else {
      alert(t("contactUs.alert.invalidOtp"));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-auto min-h-screen overflow-y-auto py-10 px-6">
        <div className="w-full sm:max-w-5xl bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-semibold text-blue-700 text-center mb-8">
            {t("contactUs.title")}
          </h1>

          {/* Main Form and Image Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left Side - Image */}
            <div className="flex-1">
              <img
                src={inquiryImage}
                alt={t("contactUs.imageAlt")}
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
                      {t("contactUs.form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("contactUs.form.namePlaceholder")}
                      required
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      {t("contactUs.form.address")}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t("contactUs.form.addressPlaceholder")}
                      required
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Mobile No. */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      {t("contactUs.form.mobile")}
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder={t("contactUs.form.mobilePlaceholder")}
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
                      {t("contactUs.form.sendOtp")}
                    </button>
                  ) : (
                    <div className="mt-6">
                      {/* OTP Input */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          {t("contactUs.form.enterOtp")}
                        </label>
                        <input
                          type="text"
                          value={otpInput}
                          onChange={handleOtpChange}
                          placeholder={t("contactUs.form.otpPlaceholder")}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                      >
                        {t("contactUs.form.verifyOtp")}
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
                {t("contactUs.info.title")}
              </h3>
              <p className="mb-4">
                <strong>{t("contactUs.info.mainBranchLabel")}</strong>
                <span className="block">{t("contactUs.info.mainBranch")}</span>
              </p>
              <p className="mb-4">
                <strong>{t("contactUs.info.secondBranchLabel")}</strong>
                <span className="block">
                  {t("contactUs.info.secondBranch")}
                </span>
              </p>
              <p className="mb-4">
                <strong>{t("contactUs.info.thirdBranchLabel")}</strong>
                <span className="block">{t("contactUs.info.thirdBranch")}</span>
              </p>
              <p className="mb-4">
                <strong>{t("contactUs.info.contactNoLabel")}</strong>
                <span className="block">{t("contactUs.info.contactNo")}</span>
              </p>
            </div>

            <div className="w-full sm:max-w-xl">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                {t("contactUs.info.shopLocationsTitle")}
              </h3>
              <iframe
                width="100%"
                height="300"
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJE9on3F3HwoAR9fzzD5n4F4A&key=YOUR_API_KEY"
                title={t("contactUs.info.mapTitle")}
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

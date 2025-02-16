import React, { useState, useEffect } from "react";
import { ImageSlider } from "../components/ImageSlider";
import { SlideForm } from "../components/SlideForm";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const EditImageSlider = () => {
  const { t } = useTranslation();

  // State for slides and form management
  const [slides, setSlides] = useState([]);
  const [isFileModified, setIsFileModified] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    link: "",
    title: "",
    description: "",
  });
  const [hoveredSlide, setHoveredSlide] = useState(null);

  // Fetch slides from the backend on component mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/new-offer/get-all-offers",
          { withCredentials: true }
        );

        console.log("Fetched slides:", data);

        let filteredSlides = [];

        if (Array.isArray(data?.data) && data.data.length > 0) {
          filteredSlides = data.data.map((item) => ({
            _id: item._id,
            title: item.title,
            description: item.description,
            link: item.link,
          }));
        } else {
          // ✅ Set a dummy slide if no slides exist
          filteredSlides = [
            {
              _id: "dummy",
              title: "Borgave Dugdhalaya",
              description:
                "शेतातून थेट तुमच्या घरापर्यंत सर्वोत्तम दुग्धजन्य पदार्थ आणत आहोत.",
              link: "https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg",
            },
          ];
        }

        setSlides(filteredSlides);
        setIsFileModified(false);
      } catch (error) {
        console.error("Error fetching slides:", error);
        setIsFileModified(false);
      }
    };

    fetchSlides();
  }, []);

  // Toggle body overflow when form is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isFormOpen);
  }, [isFormOpen]);

  // Handler for input changes (text fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file object temporarily in formData.link
      setFormData((prevData) => ({ ...prevData, link: file }));
      setIsFileModified(true);
    }
  };

  // Save (create or update) slide using async/await
  const handleSaveSlide = async () => {
    if (!formData.link || !formData.title || !formData.description) {
      alert(t("imageSlider.alerts.fillAllFields"));
      return;
    }

    try {
      // Update existing slide
      if (formData._id) {
        let response;
        if (isFileModified) {
          // When file is modified, send all formData (including the file)
          response = await axios.post(
            `http://localhost:8000/api/v1/new-offer/edit-offer/${formData._id}`,
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log("Slide updated with new file:", response.data);
        } else {
          // Otherwise, send only text fields
          response = await axios.post(
            `http://localhost:8000/api/v1/new-offer/edit-offer/${formData._id}`,
            { title: formData.title, description: formData.description },
            { withCredentials: true }
          );
          console.log("Slide updated without new file:", response.data);
        }
        // Update the slide in state using the returned data
        setSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide._id === formData._id ? response.data.data : slide
          )
        );
        setIsFileModified(false);
      } else {
        // Create new slide
        const response = await axios.post(
          "http://localhost:8000/api/v1/new-offer/add-new-offer",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("New slide created:", response.data);
        const newSlide = {
          ...formData,
          _id: response.data.data._id,
          link: response.data.data.link,
        };
        setSlides((prevSlides) => [...prevSlides, newSlide]);
      }
    } catch (error) {
      console.error("Error saving slide:", error);
    } finally {
      setIsFormOpen(false);
      // Reset form data after save
      setFormData({ _id: null, link: "", title: "", description: "" });
    }
  };

  // Delete slide handler using async/await
  const handleDelete = async (_id) => {
    if (!window.confirm(t("imageSlider.alerts.confirmDelete"))) return;
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/new-offer/delete-offer/${_id}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Slide deleted:", response.data);
      setSlides((prevSlides) =>
        prevSlides.filter((slide) => slide._id !== _id)
      );
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  // Open the form for a new slide
  const handleAddSlide = () => {
    setFormData({ _id: null, link: "", title: "", description: "" });
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative">
      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
          {t("imageSlider.slideList")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div
              key={slide._id}
              onMouseEnter={() => setHoveredSlide(slide._id)}
              onMouseLeave={() => setHoveredSlide(null)}
              className={`bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-lg rounded-lg overflow-hidden p-4 flex flex-col transition-transform duration-300 ease-in-out ${
                hoveredSlide === slide._id
                  ? "shadow-2xl scale-105 bg-[#dae4ff]"
                  : ""
              }`}
            >
              <img
                src={slide.link}
                alt={slide.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{slide.title}</h3>
              <p className="text-sm text-gray-600">{slide.description}</p>
              <div className="flex justify-between mt-4 space-x-2">
                <button
                  className="flex-1 bg-[#4c76ba] text-white text-base px-3 py-2 rounded-md shadow-md hover:bg-[#3b5c94] transition"
                  onClick={() => {
                    setFormData(slide);
                    setIsFormOpen(true);
                  }}
                >
                  {t("imageSlider.buttons.edit")}
                </button>
                <button
                  className="flex-1 bg-[#d9534f] text-white text-base px-3 py-2 rounded-md shadow-md hover:bg-[#b52b27] transition"
                  onClick={() => handleDelete(slide._id)}
                >
                  {t("imageSlider.buttons.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-5xl z-0">
        {/* Adding a dynamic key to force re-mount when slides change */}
        <ImageSlider
          key={slides.length}
          slides={slides}
          className="h-[600px] w-full relative z-0"
          autoPlayInterval={5000}
        />
      </div>

      <button
        onClick={handleAddSlide}
        className="mt-6 px-6 py-3 bg-[#1b2d5b] text-white font-semibold rounded-lg shadow-md hover:bg-[#0f1e3e] transition"
      >
        {t("imageSlider.buttons.addSlide")}
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {formData._id
                ? t("imageSlider.form.editTitle")
                : t("imageSlider.form.title")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("imageSlider.form.title")}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t("imageSlider.form.titlePlaceholder")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("imageSlider.form.description")}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t("imageSlider.form.descriptionPlaceholder")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("imageSlider.form.image")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  {t("imageSlider.buttons.cancel")}
                </button>
                <button
                  onClick={handleSaveSlide}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {t("imageSlider.buttons.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

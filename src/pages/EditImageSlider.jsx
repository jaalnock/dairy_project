import React, { useState, useEffect } from "react";
import { ImageSlider } from "../components/ImageSlider";
import { SlideForm } from "../components/SlideForm";
import { useTranslation } from "react-i18next";

export const EditImageSlider = () => {
  const { t } = useTranslation();

  const [slides, setSlides] = useState(() => {
    const savedSlides = JSON.parse(localStorage.getItem("slides"));
    return (
      savedSlides || [
        {
          id: 1,
          image:
            "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: t("premium_dairy_solutions"),
          description: t("streamline_dairy_operations"),
        },
        {
          id: 2,
          image:
            "https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: t("smart_herd_management"),
          description: t("track_optimize_herd"),
        },
        {
          id: 3,
          image:
            "https://images.pexels.com/photos/2064359/pexels-photo-2064359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: t("quality_assurance"),
          description: t("maintain_highest_standards"),
        },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("slides", JSON.stringify(slides));
  }, [slides]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    image: "",
    title: "",
    description: "",
  });
  const [hoveredSlide, setHoveredSlide] = useState(null);

  useEffect(() => {
    if (isFormOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isFormOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSlide = () => {
    if (!formData.image || !formData.title || !formData.description) {
      alert(t("fill_all_fields"));
      return;
    }

    if (formData.id) {
      setSlides(
        slides.map((slide) =>
          slide.id === formData.id ? { ...formData } : slide
        )
      );
    } else {
      setSlides([...slides, { ...formData, id: slides.length + 1 }]);
    }

    setIsFormOpen(false);
    setFormData({ id: null, image: "", title: "", description: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm(t("confirm_delete"))) {
      setSlides(slides.filter((slide) => slide.id !== id));
    }
  };

  const handleAddSlide = () => {
    setFormData({ id: null, image: "", title: "", description: "" });
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative">
      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
          {t("slide_list")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div
              key={slide.id}
              onMouseEnter={() => setHoveredSlide(slide.id)}
              onMouseLeave={() => setHoveredSlide(null)}
              className={`bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-lg rounded-lg overflow-hidden p-4 flex flex-col transition-transform duration-300 ease-in-out
              ${
                hoveredSlide === slide.id
                  ? "shadow-2xl scale-105 bg-[#dae4ff] transform"
                  : ""
              }`}
            >
              <img
                src={slide.image}
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
                  {t("edit")}
                </button>
                <button
                  className="flex-1 bg-[#d9534f] text-white text-base px-3 py-2 rounded-md shadow-md hover:bg-[#b52b27] transition"
                  onClick={() => handleDelete(slide.id)}
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-5xl z-0">
        <ImageSlider
          slides={slides}
          className="h-[600px] w-full relative z-0"
          autoPlayInterval={5000}
        />
      </div>

      <button
        onClick={handleAddSlide}
        className="mt-6 px-6 py-3 bg-[#1b2d5b] text-white font-semibold rounded-lg shadow-md hover:bg-[#0f1e3e] transition"
      >
        {t("add_slide")}
      </button>

      {isFormOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-opacity-50 flex items-center justify-center">
          <SlideForm
            isEditing={formData.id != null}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSaveSlide={handleSaveSlide}
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      )}
    </div>
  );
};

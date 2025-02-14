import React, { useState, useEffect } from "react";
import { ImageSlider } from "../components/ImageSlider";
import { SlideForm } from "../components/SlideForm";
import { useTranslation } from "react-i18next";
import axios from "axios"
export const EditImageSlider = () => {
  const { t } = useTranslation();

  // const [slides, setSlides] = useState(() => {
  //   const savedSlides = JSON.parse(localStorage.getItem("slides"));
  //   return (
  //     savedSlides || [
  //       {
  //         id: 1,
  //         image:
  //           "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //         title: t("imageSlider.slides.dairy.title"),
  //         description: t("imageSlider.slides.dairy.description"),
  //       },
  //       {
  //         id: 2,
  //         image:
  //           "https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //         title: t("imageSlider.slides.herd.title"),
  //         description: t("imageSlider.slides.herd.description"),
  //       },
  //       {
  //         id: 3,
  //         image:
  //           "https://images.pexels.com/photos/2064359/pexels-photo-2064359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //         title: t("imageSlider.slides.quality.title"),
  //         description: t("imageSlider.slides.quality.description"),
  //       },
  //     ]
  //   );
  // });
  const [slides , setSlides] = useState([]);

  useEffect( () => {
    //getting the slides from the BackEnd . . . 

    axios.get(`http://localhost:8000/api/v1/new-offer/get-all-offers`)
          .then((response) => {
            console.log("response-data: " , response)
            setSlides(response.data.data)
            const filteredData = response.data.data.map(item => ({
              _id: item._id,
              title: item.title,
              description: item.description,
              link : item.link
            }));
            setSlides(filteredData)
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          });
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    link: "",
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
        setFormData((prevData) => ({ ...prevData, link: file }));
    }
  };

  const handleSaveSlide = async () => {
    if (!formData.link || !formData.title || !formData.description) {
      alert(t("imageSlider.alerts.fillAllFields"));
      return;
    }
    console.log("formData ; " , formData)
    if (formData._id) {
      axios.post(`http://localhost:8000/api/v1/new-offer/edit-offer/${formData._id}` , 
        formData , {withCredentials : true}
      ).then((response) => {
            console.log("response-data: " , response)
            setSlides(
              slides.map((slide) =>
                slide._id === formData._id ? { ...formData } : slide
              )
            );
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          });
      
    } else {
      console.log("formData: " , formData)
      axios.post(`http://localhost:8000/api/v1/new-offer/add-new-offer` , 
        formData , {withCredentials : true , headers: { "Content-Type": "multipart/form-data" },}
      ).then((response) => {
            console.log("response-data: " , response)
            setSlides([...slides, { ...formData, _id: response.data.data._id  , link :response.data.data.link }]);
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          });
      
    }

    setIsFormOpen(false);
    setFormData({ _id: null, link: "", title: "", description: "" });
  };

  const handleDelete = (_id) => {
    if (window.confirm(t("imageSlider.alerts.confirmDelete"))) {
      axios.post(`http://localhost:8000/api/v1/new-offer/delete-offer/${_id}` , 
        formData , {withCredentials : true , headers: { "Content-Type": "multipart/form-data" },}
      ).then((response) => {
            console.log("response-data: " , response)
            setSlides(slides.filter((slide) => slide._id !== _id));
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          });
      
    }
  };

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
              className={`bg-gradient-to-br from-[#e8f0ff] to-[#cfd9ff] shadow-lg rounded-lg overflow-hidden p-4 flex flex-col transition-transform duration-300 ease-in-out
              ${
                hoveredSlide === slide._id
                  ? "shadow-2xl scale-105 bg-[#dae4ff] transform"
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
        {t("imageSlider.buttons.addSlide")}
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {formData.id
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

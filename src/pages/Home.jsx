import React, { useEffect } from "react";
import { ImageSlider, ProductImageSlider, About } from "../components/index.js";
import { motion } from "framer-motion";
// Added for translation support
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation(); // Added translation hook

  //Fetch these slides through API
  const slides = [
    {
      image:
        "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Premium Dairy Solutions",
      description:
        "Streamline your dairy operations with our advanced management system",
    },
    {
      image:
        "https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Smart Herd Management",
      description: "Track and optimize your herd's health and productivity",
    },
    {
      image:
        "https://images.pexels.com/photos/2064359/pexels-photo-2064359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Quality Assurance",
      description: "Maintain the highest standards in dairy production",
    },
  ];

  const sli = [
    {
      image:
        "https://images.pexels.com/photos/799273/pexels-photo-799273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Fresh Milk",
      description:
        "Our pure, organic fresh milk delivered straight from the farm.",
    },
    {
      image:
        "https://images.pexels.com/photos/94443/pexels-photo-94443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Butter",
      description: "Our rich, creamy butter made from the finest dairy.",
    },
    {
      image:
        "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Cheese",
      description: "Delicious handcrafted cheese with an exquisite taste.",
    },
  ];

  // Added: Map original slides to translated slides using t() with default values
  const translatedSlides = slides.map((slide, index) => ({
    ...slide,
    title: t(`home.heroSlides.${index}.title`, { defaultValue: slide.title }),
    description: t(`home.heroSlides.${index}.description`, {
      defaultValue: slide.description,
    }),
  }));

  const translatedSli = sli.map((slide, index) => ({
    ...slide,
    title: t(`home.productSlides.${index}.title`, {
      defaultValue: slide.title,
    }),
    description: t(`home.productSlides.${index}.description`, {
      defaultValue: slide.description,
    }),
  }));

  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  // Preload images when the component mounts
  useEffect(() => {
    preloadImages(slides.map((slide) => slide.image));
  }, [slides]);

  return (
    <motion.div className="min-h-screen space-y-0">
      {/* ImageSlider for the Hero Section */}
      <ImageSlider
        slides={translatedSlides} // Now using translated slides
        className="h-[600px]"
        autoPlayInterval={5000}
      />

      {/* About Us Section */}
      <About />

      {/* Product Image Slider for showing product images */}
      <ProductImageSlider
        slides={translatedSli} // Now using translated product slides
        autoPlayInterval={5000}
        className="h-[600px]" // Adjust as needed
      />
    </motion.div>
  );
}

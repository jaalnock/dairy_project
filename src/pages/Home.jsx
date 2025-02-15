import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImageSlider, ProductImageSlider, About } from "../components/index.js";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  // State for dynamic hero slides fetched from the backend
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingHero, setLoadingHero] = useState(true);

  // Static product slides array
  const staticProductSlides = [
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

  // Translate the static product slides
  const translatedProductSlides = staticProductSlides.map((slide, index) => ({
    ...slide,
    title: t(`home.productSlides.${index}.title`, {
      defaultValue: slide.title,
    }),
    description: t(`home.productSlides.${index}.description`, {
      defaultValue: slide.description,
    }),
  }));

  // Function to fetch dynamic hero slides using axios
  const fetchHeroSlides = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/new-offer/get-all-offers"
      );

      // console.log("Fetched hero slides:", response.data.data);
      const data = response?.data?.data ?? [];

      let updatedHeroSlides = [];

      if (Array.isArray(data) && data.length > 0) {
        updatedHeroSlides = data.map((slide) => ({
          _id: slide._id,
          title: slide.title,
          description: slide.description,
          link: slide.link,
        }));
      } else {
        // ✅ Add a dummy slide when no slides exist
        updatedHeroSlides = [
          {
            _id: "dummy",
            title: "Borgave Dugdhalaya",
            description:
              "शेतातून थेट तुमच्या घरापर्यंत सर्वोत्तम दुग्धजन्य पदार्थ आणत आहोत.",
            link: "https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg",
          },
        ];
      }

      setHeroSlides(updatedHeroSlides);
    } catch (error) {
      console.error("Error fetching hero slides:", error);
    } finally {
      setLoadingHero(false);
    }
  };

  // Poll for hero slides: initial fetch and then every 10 seconds
  useEffect(() => {
    fetchHeroSlides(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchHeroSlides();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [t]);

  // Preload images for the hero slides after they are fetched
  useEffect(() => {
    const preloadImages = (imageUrls) => {
      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    if (heroSlides.length) {
      const imageUrls = heroSlides.map((slide) => slide.image);
      preloadImages(imageUrls);
    }
  }, [heroSlides]);

  return (
    <motion.div className="min-h-screen space-y-0">
      {/* Dynamic Hero Section */}
      {loadingHero ? (
        <div>Loading hero slides...</div>
      ) : (
        <ImageSlider
          key={heroSlides.length} // Using slides length as a dynamic key forces re-mount when slides change.
          slides={heroSlides}
          className="h-[600px]"
          autoPlayInterval={5000}
        />
      )}

      {/* About Us Section */}
      <About />

      {/* Static Product Image Slider */}
      <ProductImageSlider
        slides={translatedProductSlides}
        autoPlayInterval={5000}
        className="h-[600px]"
      />
    </motion.div>
  );
}

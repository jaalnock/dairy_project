// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: {
        heroSlides: [
          {
            title: "Premium Dairy Solutions",
            description:
              "Streamline your dairy operations with our advanced management system",
          },
          {
            title: "Smart Herd Management",
            description:
              "Track and optimize your herd's health and productivity",
          },
          {
            title: "Quality Assurance",
            description: "Maintain the highest standards in dairy production",
          },
        ],
        productSlides: [
          {
            title: "Fresh Milk",
            description:
              "Our pure, organic fresh milk delivered straight from the farm.",
          },
          {
            title: "Butter",
            description: "Our rich, creamy butter made from the finest dairy.",
          },
          {
            title: "Cheese",
            description:
              "Delicious handcrafted cheese with an exquisite taste.",
          },
        ],
      },
      about: {
        title: "About Us",
        subtitle:
          "We are dedicated to bringing you the freshest and most organic dairy products straight from the farm to your table!",
        journeyTitle: "Our Journey",
        paragraph1:
          "Founded on the principles of sustainability and quality, we have been providing premium dairy products to families for over 20 years. Our farms use eco-friendly methods and ethical practices to ensure that the milk and other dairy products we produce are fresh, nutritious, and free of harmful additives.",
        paragraph2:
          "Our farm is located in the heart of the countryside, where our cows roam freely and enjoy a natural, healthy lifestyle. We take pride in using traditional farming methods while embracing innovative practices to ensure the highest quality in every product we make.",
        learnMore: "Learn More",
        contactUs: "Contact Us",
      },
      about: {
        title: "About Us",
        subtitle:
          "We are dedicated to bringing you the freshest and most organic dairy products straight from the farm to your table!",
        journeyTitle: "Our Journey",
        paragraph1:
          "Founded on the principles of sustainability and quality, we have been providing premium dairy products to families for over 20 years. Our farms use eco-friendly methods and ethical practices to ensure that the milk and other dairy products we produce are fresh, nutritious, and free of harmful additives.",
        paragraph2:
          "Our farm is located in the heart of the countryside, where our cows roam freely and enjoy a natural, healthy lifestyle. We take pride in using traditional farming methods while embracing innovative practices to ensure the highest quality in every product we make.",
        learnMore: "Learn More",
        contactUs: "Contact Us",
      },
      aboutUs: {
        hero: {
          title: "Pure Dairy Excellence",
          subtitle:
            "From our family farms to your table, delivering nature's goodness since 1945",
          imageAlt: "Green dairy farm landscape",
        },
        heritage: {
          title: "Our Heritage",
          description:
            "For three generations, we've been committed to producing the finest dairy products while maintaining sustainable farming practices and supporting our local communities. Every glass of milk tells our story of dedication to quality and care.",
        },
        values: {
          happyCows: {
            title: "Happy Cows",
            description:
              "Our cows graze freely on lush pastures, ensuring the highest quality milk",
          },
          sustainable: {
            title: "Sustainable",
            description:
              "Committed to environmentally friendly farming practices",
          },
          premiumQuality: {
            title: "Premium Quality",
            description:
              "Award-winning dairy products that exceed industry standards",
          },
          familyValues: {
            title: "Family Values",
            description:
              "Three generations of dairy farming expertise and passion",
          },
        },
        process: {
          title: "Our Process",
          steps: [
            {
              title: "Natural Grazing",
              description: "Free-range grazing on organic pastures",
            },
            {
              title: "Fresh Collection",
              description: "Twice-daily milking schedule",
            },
            {
              title: "Processing",
              description: "State-of-the-art facility",
            },
            {
              title: "Quality Testing",
              description: "Rigorous quality controls",
            },
          ],
        },
        team: {
          title: "Our Dairy Experts",
          members: {
            john: "Master Dairy Farmer",
            maria: "Quality Control Director",
            robert: "Production Manager",
          },
        },
      },
    },
  },
  mr: {
    translation: {
      home: {
        heroSlides: [
          {
            title: "प्रिमियम डेअरी सोल्यूशन्स",
            description:
              "आमच्या प्रगत व्यवस्थापन प्रणालीसह तुमचे डेअरी ऑपरेशन्स सुलभ करा",
          },
          {
            title: "स्मार्ट पशुधन व्यवस्थापन",
            description:
              "तुमच्या पशुधनाचे आरोग्य आणि उत्पादकता ट्रॅक करा आणि अनुकूल करा",
          },
          {
            title: "गुणवत्ता हमी",
            description: "डेअरी उत्पादनामध्ये उच्चतम दर्जा राखा",
          },
        ],
        productSlides: [
          {
            title: "ताजे दूध",
            description:
              "आमचे शुद्ध, सेंद्रिय ताजे दूध थेट शेतातून वितरित केले जाते.",
          },
          {
            title: "लोणी",
            description:
              "आमच्या उत्कृष्ट डेअरीपासून बनवलेले समृद्ध, मलईयुक्त लोणी.",
          },
          {
            title: "चीज",
            description: "उत्तम चव असलेले स्वादिष्ट हस्तनिर्मित चीज.",
          },
        ],
      },
      about: {
        title: "आमच्याबद्दल",
        subtitle:
          "आम्ही तुम्हाला ताज्या आणि सेंद्रिय डेअरी उत्पादनांचे वितरण थेट शेतातून तुमच्या ताटात करतो!",
        journeyTitle: "आमची वाटचाल",
        paragraph1:
          "शाश्वतता आणि गुणवत्ता यांच्या तत्त्वांवर आमची स्थापना झाली असून, आम्ही वीस वर्षांपासून कुटुंबांना उच्च दर्जाची डेअरी उत्पादने पुरवत आहोत. आमची शेतं पर्यावरणपूरक पद्धती आणि नैतिक व्यवहारांचा वापर करतात ज्यामुळे आमचे दूध व इतर डेअरी उत्पादने ताजी, पौष्टिक आणि हानिकारक पदार्थांपासून मुक्त असतात.",
        paragraph2:
          "आमचे शेत ग्रामीण भागाच्या हृदयात आहे, जिथे आमच्या गायी मोकळेपणाने फिरतात आणि नैसर्गिक, आरोग्यदायी जीवनशैली उपभोगतात. आम्ही पारंपरिक शेती पद्धती वापरत असतानाच नावीन्यपूर्ण पद्धतींचे स्वागत करतो, जेणेकरून आम्ही तयार करतो प्रत्येक उत्पादन उच्च दर्जाचे असेल.",
        learnMore: "आधिक जाणून घ्या",
        contactUs: "आमच्याशी संपर्क करा",
      },
      aboutUs: {
        hero: {
          title: "शुद्ध डेअरी उत्कृष्टता",
          subtitle:
            "आमच्या कौटुंबिक शेतांमधून तुमच्या टेबलपर्यंत, 1945 पासून नैसर्गिक सौम्यतेचे वितरण",
          imageAlt: "हिरव्या डेअरी शेताचे दृश्य",
        },
        heritage: {
          title: "आमची वारसा",
          description:
            "तीन पिढ्यांपासून, आम्ही टिकाऊ शेती पद्धतींचे पालन करून आणि स्थानिक समुदायांना पाठिंबा देत सर्वोत्तम डेअरी उत्पादने तयार करण्यात कटिबद्ध आहोत. प्रत्येक ग्लास दूध आमच्या गुणवत्ता आणि काळजीच्या समर्पणाची कथा सांगते.",
        },
        values: {
          happyCows: {
            title: "आनंदी गायी",
            description:
              "आमच्या गायी समृद्ध चराईवर मोकळ्या गवतावर चरतात, ज्यामुळे उत्कृष्ट दर्जाचे दूध मिळते",
          },
          sustainable: {
            title: "शाश्वत",
            description: "पर्यावरणपूरक शेती पद्धतींसाठी बांधिल",
          },
          premiumQuality: {
            title: "उत्कृष्ट दर्जा",
            description:
              "उद्योगमानाने पुढे जाणारी पुरस्कारप्राप्त डेअरी उत्पादने",
          },
          familyValues: {
            title: "कौटुंबिक मूल्ये",
            description: "डेअरी शेतीतील तीन पिढ्यांचे तज्ञता आणि उत्साह",
          },
        },
        process: {
          title: "आमची प्रक्रिया",
          steps: [
            {
              title: "नैसर्गिक चराई",
              description: "सेंद्रिय चराईवर मोकळ्या पद्धतीने चराई",
            },
            {
              title: "ताजे संकलन",
              description: "दिवसातून दोन वेळा दूध संकलन",
            },
            {
              title: "प्रक्रिया",
              description: "अत्याधुनिक सुविधा",
            },
            {
              title: "गुणवत्ता चाचणी",
              description: "कडक गुणवत्ता नियंत्रण",
            },
          ],
        },
        team: {
          title: "आमचे डेअरी तज्ञ",
          members: {
            john: "मुख्य डेअरी शेतकरी",
            maria: "गुणवत्ता नियंत्रण संचालक",
            robert: "उत्पादन व्यवस्थापक",
          },
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;

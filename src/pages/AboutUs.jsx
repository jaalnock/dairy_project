import React from "react";
import {
  Cog as Cow,
  Milk,
  LeafyGreen,
  Award,
  Droplets,
  Sun,
  Factory,
  Heart,
} from "lucide-react";
import { useTranslation } from "react-i18next";

function AnimatedCard({ icon: Icon, title, description, delay }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeIn"
      style={{ animationDelay: delay }}
    >
      <Icon className="w-12 h-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function AboutUs() {
  const { t } = useTranslation();

  // Define team members with translation for roles
  const teamMembers = [
    {
      name: "John Anderson",
      role: t("aboutUs.team.members.john", {
        defaultValue: "Master Dairy Farmer",
      }),
      image:
        "https://images.unsplash.com/photo-1520451644838-906a72aa7c86?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Maria Thompson",
      role: t("aboutUs.team.members.maria", {
        defaultValue: "Quality Control Director",
      }),
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Robert Miller",
      role: t("aboutUs.team.members.robert", {
        defaultValue: "Production Manager",
      }),
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/30394404/pexels-photo-30394404/free-photo-of-scenic-farm-landscape-with-mountain-views.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt={t("aboutUs.hero.imageAlt", {
            defaultValue: "Green dairy farm landscape",
          })}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative text-center text-white p-8 animate-slideDown">
          <h1 className="text-5xl font-bold mb-4">
            {t("aboutUs.hero.title", { defaultValue: "Pure Dairy Excellence" })}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t("aboutUs.hero.subtitle", {
              defaultValue:
                "From our family farms to your table, delivering nature's goodness since 1945",
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Heritage Statement */}
        <div className="text-center mb-20 animate-slideUp">
          <h2 className="text-3xl font-bold mb-6">
            {t("aboutUs.heritage.title", { defaultValue: "Our Heritage" })}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("aboutUs.heritage.description", {
              defaultValue:
                "For three generations, we've been committed to producing the finest dairy products while maintaining sustainable farming practices and supporting our local communities. Every glass of milk tells our story of dedication to quality and care.",
            })}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <AnimatedCard
            icon={Cow}
            title={t("aboutUs.values.happyCows.title", {
              defaultValue: "Happy Cows",
            })}
            description={t("aboutUs.values.happyCows.description", {
              defaultValue:
                "Our cows graze freely on lush pastures, ensuring the highest quality milk",
            })}
            delay="0s"
          />
          <AnimatedCard
            icon={LeafyGreen}
            title={t("aboutUs.values.sustainable.title", {
              defaultValue: "Sustainable",
            })}
            description={t("aboutUs.values.sustainable.description", {
              defaultValue:
                "Committed to environmentally friendly farming practices",
            })}
            delay="0.2s"
          />
          <AnimatedCard
            icon={Award}
            title={t("aboutUs.values.premiumQuality.title", {
              defaultValue: "Premium Quality",
            })}
            description={t("aboutUs.values.premiumQuality.description", {
              defaultValue:
                "Award-winning dairy products that exceed industry standards",
            })}
            delay="0.4s"
          />
          <AnimatedCard
            icon={Heart}
            title={t("aboutUs.values.familyValues.title", {
              defaultValue: "Family Values",
            })}
            description={t("aboutUs.values.familyValues.description", {
              defaultValue:
                "Three generations of dairy farming expertise and passion",
            })}
            delay="0.6s"
          />
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("aboutUs.process.title", { defaultValue: "Our Process" })}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Sun,
                title: t("aboutUs.process.steps.0.title", {
                  defaultValue: "Natural Grazing",
                }),
                description: t("aboutUs.process.steps.0.description", {
                  defaultValue: "Free-range grazing on organic pastures",
                }),
              },
              {
                icon: Milk,
                title: t("aboutUs.process.steps.1.title", {
                  defaultValue: "Fresh Collection",
                }),
                description: t("aboutUs.process.steps.1.description", {
                  defaultValue: "Twice-daily milking schedule",
                }),
              },
              {
                icon: Factory,
                title: t("aboutUs.process.steps.2.title", {
                  defaultValue: "Processing",
                }),
                description: t("aboutUs.process.steps.2.description", {
                  defaultValue: "State-of-the-art facility",
                }),
              },
              {
                icon: Droplets,
                title: t("aboutUs.process.steps.3.title", {
                  defaultValue: "Quality Testing",
                }),
                description: t("aboutUs.process.steps.3.description", {
                  defaultValue: "Rigorous quality controls",
                }),
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="text-center p-4"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <step.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center animate-slideUp">
          <h2 className="text-3xl font-bold mb-12">
            {t("aboutUs.team.title", { defaultValue: "Our Dairy Experts" })}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-lg transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm opacity-90">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

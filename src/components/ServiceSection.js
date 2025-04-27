import { useEffect, useRef } from "react";
import meatBg from "../assets/meat.jpg";
// import coffeeBg from "../assets/coffee-bg.jpg";
// import pyrethrumBg from "../assets/pyrethrum-bg.jpg";

function ServicesSection() {
  const cardsRef = useRef([]);

  // Animation trigger on mount
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-fade-in");
      }, index * 200); // Staggered delay
    });
  }, []);

  const services = [
    {
      title: "Quality Assurance",
      description: "We ensure every cut meets the highest standards for freshness and safety.",
      image: meatBg || "https://via.placeholder.com/600x400?text=Meat",
    },
    {
      title: "Expert Packaging",
      description: "Customized packaging solutions that preserve freshness from farm to destination.",
      image: meatBg || "https://via.placeholder.com/600x400?text=Coffee",
    },
    {
      title: "Global Shipping",
      description: "Trusted logistics network delivering premium Kenyan mutton worldwide.",
      image: meatBg || "https://via.placeholder.com/600x400?text=Pyrethrum",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen bg-zinc-100 flex items-center snap-start"
    >
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 drop-shadow-lg">
        Our Premium Services
        </h2>
        <p className="text-lg md:text-xl mb-10 drop-shadow-sm max-w-3xl mx-auto text-gray-600 ">At Kenya Fresh Meat Ltd., we are committed to delivering world-class mutton exports with unmatched quality, precision packaging, and reliable global shipping.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative h-[50vh] md:h-[60vh] bg-cover bg-center rounded-xl shadow-lg border-2 border-[#8B0000] hover:border-[#6B0000] hover:scale-105 transition-all duration-300 opacity-0 flex items-center justify-center"
              style={{ backgroundImage: `url(${service.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
              {/* Content */}
              <div className="relative z-10 p-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">
                  {service.title}
                </h3>
                <p className="text-lg text-white drop-shadow-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for Animation */}
      <style jsx>{`
        .animate-fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .grid > div {
          transform: translateY(20px);
        }
      `}</style>
    </section>
  );
}

export default ServicesSection;
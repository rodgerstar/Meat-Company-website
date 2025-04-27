import { useEffect, useRef } from "react";
import meatImage from "../assets/meat.jpg";

function AboutSection() {
  const contentRef = useRef(null);

  // Animation trigger on mount
  useEffect(() => {
    contentRef.current.classList.add("animate-slide-in");
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen bg-zinc-200 flex items-center snap-start relative overflow-hidden"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center h-full py-8">
        {/* Left Half: Image */}
        <div className="w-full md:w-1/2 relative z-10 mt-8 md:mt-12 mr-0">
          <div className="relative transform -rotate-6 md:-rotate-12 shadow-xl rounded-lg overflow-hidden">
            <img
              src={meatImage || "https://via.placeholder.com/800x600"}
              alt="Kenya Exports Products"
              className="w-full h-64 md:h-[80vh] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        </div>

        {/* Right Half: Content */}
        <div
          ref={contentRef}
          className="w-full md:w-1/2 p-8 md:p-12 text-gray-900 flex items-center justify-center h-full opacity-0 transition-all duration-1000"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              About Us
            </h2>
            <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
              Kenya Exports is your premier partner for high-quality Kenyan products, including succulent meats, aromatic coffee, and eco-friendly pyrethrum. Our commitment to sustainability and excellence ensures that every product we deliver meets global standards, connecting Kenya’s finest to the world.
            </p>
            <a
              href="#contact"
              className="bg-[#8B0000] text-white px-6 py-3 rounded-lg hover:bg-[#6B0000] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Diagonal Background Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-transparent transform -skew-x-12 z-0"
          style={{ clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)" }}
        ></div>
      </div>

      {/* CSS for Animation */}
      <style jsx>{`
        .animate-slide-in {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        [ref="contentRef"] {
          transform: translateX(100px);
        }
      `}</style>
    </section>
  );
}

export default AboutSection;
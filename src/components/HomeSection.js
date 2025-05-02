import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import kenyaLandscape from "../assets/mutton5.png";
// Replace these with your actual image paths
import mutton3 from "../assets/muton2.png";
import mutton4 from "../assets/mutton3.png";

function HomeSection() {
  const images = [mutton4, mutton3, kenyaLandscape];
  const texts = [
    "Fresh from Kenya to the World.",
    "Quality Assurance Meat",
    "Expert Packaging",
    "Global Shipping",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image slideshow (every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  // Calculate typing duration based on text length and speed
  const typingSpeed = 50; // Speed in ms per character
  const deletionSpeed = 50; // Deletion speed in ms per character
  const pauseDuration = 2000; // Pause after typing completes
  const sequence = texts.flatMap((text, index) => {
    const typingDuration = text.length * typingSpeed; // Time to type the text
    const deletionDuration = text.length * deletionSpeed; // Time to delete the text
    return [
      text, // Type the text
      pauseDuration, // Wait after typing
      "", // Erase the text
      deletionDuration + 500, // Wait after erasing before next text
    ];
  });

  return (
    <section id="home" className="h-screen relative overflow-hidden">
      {/* Slideshow Background */}
      <div className="slideshow">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentImageIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      {/* Text */}
      <div className="container mx-auto h-full flex items-center justify-center text-center text-white absolute inset-0 z-10">
        <div>
          <h1 className="text-6xl font-bold mb-4">Welcome to Kenya Fresh Meat Ltd.</h1>
          <p className="text-3xl whitespace-nowrap">
          Kenya Fresh Meat — {" "}
            <span>
              <TypeAnimation
                sequence={sequence}
                speed={typingSpeed}
                deletionSpeed={deletionSpeed}
                repeat={Infinity}
              />
            </span>
          </p>
        </div>
      </div>

      {/* CSS for Slideshow and Text */}
      <style jsx>{`
        .slideshow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: translateX(100%);
          transition: opacity 1s ease-in-out, transform 1s ease-in-out;
        }

        .slide.active {
          opacity: 1;
          transform: translateX(0);
        }

        .slide:not(.active) {
          transform: translateX(-100%);
        }

        /* Prevent text from wrapping */
        .whitespace-nowrap {
          white-space: nowrap;
        }

        /* Ensure TypeAnimation text stays inline */
        p span {
          display: inline;
        }
      `}</style>
    </section>
  );
}

export default HomeSection;













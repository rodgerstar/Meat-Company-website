import { useEffect, useRef } from "react";
import kenyaLandscape from "../assets/contact.jpg";

function ContactSection() {
  const formRef = useRef(null);

  // Add fade-in animation on mount
  useEffect(() => {
    if (formRef.current) {
      console.log("Form ref exists, applying animation"); // Debugging
      setTimeout(() => {
        formRef.current.classList.add("animate-fade-in");
      }, 100);
    } else {
      console.log("Form ref not found"); // Debugging
    }
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#FDF7F7] snap-start flex flex-col overflow-auto"
    >
      {/* Top Section with Background Image and Overlay */}
      <div
        className="min-h-[50vh] flex items-center justify-center py-16 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${kenyaLandscape})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#A83333]/80"></div>
        <div className="relative text-center px-4 z-10">
          <h2 className="text-5xl font-bold text-white drop-shadow-lg mb-6">
            Contact Us
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Reach out to us for inquiries, orders, or to learn more about our premium exports!
          </p>
        </div>
      </div>

      {/* Bottom Section with Form */}
      <div className="min-h-[50vh] bg-white flex items-center justify-center py-16">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            Let’s Start a Conversation
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            Please note: all fields are required.
          </p>
          <div
            ref={formRef}
            className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg opacity-0 transform translate-y-10"
          >
            <form className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-[#A83333] focus:outline-none text-gray-800 placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-[#A83333] focus:outline-none text-gray-800 placeholder-gray-400"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-4 bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-[#A83333] focus:outline-none text-gray-800 placeholder-gray-400"
                rows="6"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-[#A83333] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B2A2A] hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default ContactSection;
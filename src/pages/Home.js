import HomeSection from "../components/HomeSection"
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServiceSection";
import ProductsSection from "../components/ProductSection";
import ContactSection from "../components/ContactSection";

function Home() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <ContactSection />
    </div>
  );
}

export default Home;
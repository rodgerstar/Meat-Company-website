import { useState, useEffect, useRef } from "react";
import axios from "axios";
import StarRating from "./StarRating";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeRef = useRef(null);

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Auto-swipe every 3 seconds if more than 4 products
  useEffect(() => {
    if (products.length > 4) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 >= products.length ? 0 : prevIndex + 1
        );
      }, 20000);
      return () => clearInterval(interval);
    } else {
      setCurrentIndex(0); // Reset index if ≤4 products
    }
  }, [products.length]);

  // Get products to display
  const getDisplayedProducts = () => {
    if (products.length <= 4) {
      // Show only available products (no placeholders)
      return products;
    } else {
      // Show 4 products, cycling with swipe
      const displayed = [];
      for (let i = 0; i < 4; i++) {
        const index = (currentIndex + i) % products.length;
        displayed.push(products[index]);
      }
      return displayed;
    }
  };

  const displayedProducts = getDisplayedProducts();

  return (
    <section
      id="products"
      className="min-h-screen bg-zinc-200 flex items-center snap-start"
    >
      <div className="container mx-auto text-center px-2">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 drop-shadow-lg">
          Our Products
        </h2>
        <p className="text-lg md:text-xl mb-10 drop-shadow-sm max-w-3xl mx-auto text-gray-600 ">Discover our finest selection of fresh, high-quality mutton and meat cuts, carefully prepared to meet export standards.</p>
        <div
          ref={swipeRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto"
        >
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                products.length > 4 ? "animate-swipe-left" : ""
              }`}
              style={{
                animationDelay: products.length > 4 ? `${index * 0.2}s` : "0s",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-1">
                <div className="flex justify-between items-center mb-1 mt-2">
                  <h3 className="text-xl font-semibold ml-2 text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <StarRating className='mr-2' rating={4.5} />
                </div>
                <p className="text-gray-600 ml-2 text-left mb-1 line-clamp-2">
                  {product.description}
                </p>
                
                
              </div>
              <div className="absolute inset-0 border-2 border-transparent hover:border-[#8B0000] transition-colors duration-300 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 0;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-swipe-left {
          animation: swipeLeft 2.5s ease-in-out;
        }
        @keyframes swipeLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

export default ProductsSection;
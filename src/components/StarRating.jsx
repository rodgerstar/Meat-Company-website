import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating); // Full stars (e.g., 4 for 4.5)
  const hasHalfStar = rating % 1 >= 0.5; // Half star if ≥0.5 (true for 4.5)

  return (
    <div className=" ml-2 flex items-center space-x-1 mb-2 mr-3">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          // Full star
          return <FaStar key={index} className="text-[#A83333] text-lg" />;
        } else if (index === fullStars && hasHalfStar) {
          // Half star
          return <FaStarHalfAlt key={index} className="text-[#A83333] text-lg" />;
        } else {
          // Empty star
          return <FaStar key={index} className="text-gray-300 text-lg" />;
        }
      })}
    </div>
  );
}

export default StarRating;
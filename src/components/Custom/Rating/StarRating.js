import React from "react";

const StarRating = ({ averageStars }) => {
  // Generate an array to display stars
  const fullStars = Math.floor(averageStars); // Number of full stars
  const halfStars = averageStars % 1 >= 0.5 ? 1 : 0; // Check if a half star is needed
  const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars

  return (
    <div className="star-rating">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className="text-warning fs-5">
          ★
        </span>
      ))}
      {/* Render half stars */}
      {halfStars > 0 && (
        <span key="half" className="text-warning fs-5">
          ☆
        </span>
      )}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="text-secondary fs-5">
          ☆
        </span>
      ))}
    </div>
  );
};

export default StarRating;

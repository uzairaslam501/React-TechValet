import React, { useState } from "react";

const StarRating = ({ totalStars = 5, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleClick = (rate) => {
    setRating(rate);
    if (onRatingSubmit) {
      onRatingSubmit(rate);
    }
  };

  return (
    <div className="star-rating" style={{ display: "flex", gap: "5px" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <i
            className="bi bi-star"
            key={index}
            size={24}
            style={{ cursor: "pointer" }}
            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;

// Usage Example:
// <StarRating totalStars={5} onRatingSubmit={(rate) => console.log("User rating:", rate)} />

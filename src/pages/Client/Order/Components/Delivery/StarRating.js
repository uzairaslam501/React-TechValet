import React, { useState } from "react";
import { Button } from "react-bootstrap";

const StarRating = ({ totalStars = 5, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleRating = (starValue) => {
    setRating(starValue);
    if (onRatingSubmit) {
      onRatingSubmit(starValue);
    }
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    const isHalf = hover ? hover - index > 0.5 : rating - index > 0.5;
    const fullStarColor = "#ffd700"; // Gold color
    const emptyStarColor = "#d3d3d3"; // Light gray color
    const halfStarColor = "#ffd700"; // Half-filled star color

    return (
      <div
        key={index}
        style={{ cursor: "pointer", margin: "0 5px" }}
        onClick={() => handleRating(starValue)}
        onMouseEnter={() => setHover(starValue)}
        onMouseLeave={() => setHover(null)}
      >
        {starValue <= (hover || rating) ? (
          <i
            className="bi bi-star-fill"
            style={{ color: fullStarColor, fontSize: "24px" }}
          />
        ) : isHalf ? (
          <i
            className="bi bi-star-half"
            style={{ color: halfStarColor, fontSize: "24px" }}
          />
        ) : (
          <i
            className="bi bi-star"
            style={{ color: emptyStarColor, fontSize: "24px" }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center">
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;

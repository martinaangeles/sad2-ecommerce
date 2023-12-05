import React, { useState } from "react";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;

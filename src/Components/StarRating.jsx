import React from 'react'
import { useState } from 'react';
import { MdOutlineStarPurple500 } from "react-icons/md";

function StarRating({ totalStars = 5, selectedStars, onRating = (f) => f }) {
//   const [selectedStars, setSelectedStars] = useState(0);

  const Star = ({ selected = false, onClick = (f) => f }) => (
    <MdOutlineStarPurple500
      onClick={onClick}
      color={selected ? "#FFD700" : "#ccc"}
      size="24px"
    />
  );
  console.log(selectedStars);

  return (
    <div>
      {" "}
      <div className="flex">
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={i < selectedStars}
            onClick={() => onRating(i + 1)}
          />
        ))}
        {/* <p>
          {selectedStars} of {totalStars} stars
        </p> */}
      </div>
    </div>
  );
}

export default StarRating
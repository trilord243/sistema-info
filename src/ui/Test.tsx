import { useState } from "react";
import { StarRating } from "./StarRating";

export const Test = () => {
  const [rating, setRating] = useState(0);
  console.log(rating);

  const handleSetRating = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div>
      <StarRating maxRating={5} size={24} onsetRating={handleSetRating} />
    </div>
  );
};

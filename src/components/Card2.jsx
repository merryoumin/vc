import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

function Card({ frontContent2, backContent2 }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSwipeLeft = () => {
    console.log("Swipe left");
    setIsFlipped(false);
  };

  const handleSwipeRight = () => {
    console.log("Swipe right");
    setIsFlipped(true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} {...swipeHandlers}>
      <div className="card-front ">
        <div className="card-content">{frontContent2}</div>
      </div>
      <div className="card-back ">
        <div className="card-content">{backContent2}</div>
      </div>
    </div>
  );
}

export default Card;

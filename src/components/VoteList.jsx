import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
function VoteList({ account }) {
  const cardData = Array(10)
    .fill()
    .map((_, index) => ({
      frontContent: <div>Front of Card {index + 1}</div>,
      backContent: (
        <div>
          Back of Card {index + 1}
          <input type="radio" />
        </div>
      ),
    }));

  useEffect(() => {}, []);

  return (
    <div>
      {cardData.map((card, index) => (
        <div className="mt-10">
          <Card
            key={index}
            frontContent={card.frontContent}
            backContent={card.backContent}
          />
        </div>
      ))}
    </div>
  );
}

export default VoteList;

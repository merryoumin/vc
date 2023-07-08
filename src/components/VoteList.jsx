import React, { useState, useEffect } from "react";
import Card from "./Card";

function VoteList({ account }) {
  return (
    <div>
      <Card
        frontContent={<div>Front of Card 1</div>}
        backContent={<div>Back of Card 1</div>}
      />
    </div>
  );
}

export default VoteList;

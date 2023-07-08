import React, { useState, useEffect } from "react";
import VoteListAll from "./VoteListAll";
import VoteListByMe from "./VoteListByMe";
import Card from "./Card";

function VoteList({ account }) {
  return (
    <div>
      <VoteListAll account={account} />
      <VoteListByMe account={account} />
      <Card
        frontContent={<div>Front of Card 1</div>}
        backContent={<div>Back of Card 1</div>}
      />
      <Card
        frontContent={<div>Front of Card 2</div>}
        backContent={<div>Back of Card 2</div>}
      />
    </div>
  );
}

export default VoteList;

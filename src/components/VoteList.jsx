import React, { useState, useEffect } from "react";
import VoteListAll from "./VoteListAll";
import VoteListByMe from "./VoteListByMe";

function VoteList({ account }) {
  return (
    <div>
      VoteList
      <div>1</div>
      <div>1</div> <div>1</div> <div>1</div> <div>1</div> <div>1</div>{" "}
      <div>1</div> <div>1</div> <div>1</div> <div>1</div> <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <VoteListAll account={account} />
      <VoteListByMe account={account} />
    </div>
  );
}

export default VoteList;

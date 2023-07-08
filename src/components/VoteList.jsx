import React, { useState, useEffect } from "react";
import VoteListAll from "./VoteListAll";
import VoteListByMe from "./VoteListByMe";

function VoteList({ account }) {
  return (
    <div>
      VoteList
      <VoteListAll account={account} />
      <VoteListByMe account={account} />
    </div>
  );
}

export default VoteList;

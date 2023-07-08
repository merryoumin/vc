import React, { useState, useEffect } from "react";
import VoteList from "../components/VoteList";
import VoteCreate from "../components/VoteCreate";

function Vote({ account }) {
  const [showList, setShowList] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const handleListButtonClick = () => {
    setShowList(true);
    setShowCreate(false);
  };
  const handleCreateButtonClick = () => {
    setShowList(false);
    setShowCreate(true);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex   justify-between  bg-gray-50  w-screen rounded-t-2xl ">
        <div
          style={{ fontFamily: "text" }}
          className=" text-xl text-gray-300  pl-10 flex  items-center "
        >
          VOTE
        </div>
        <div>
          <button
            style={{ fontFamily: "text" }}
            className={`bg-gray-300 w-24 hover:bg-teal-200 text-white text-lg py-3 px-6 rounded-t-2xl ${
              showList ? "bg-teal-200" : ""
            }`}
            onClick={handleListButtonClick}
          >
            List
          </button>
          <button
            style={{ fontFamily: "text" }}
            className={`bg-gray-300 w-24 hover:bg-teal-200 text-white text-lg py-3 px-6 rounded-t-2xl ${
              showCreate ? "bg-teal-200" : ""
            }`}
            onClick={handleCreateButtonClick}
          >
            Create
          </button>
        </div>
      </div>
      <div className=" w-screen  h-screen  flex items-start justify-center bg-gray-50 p-4">
        {showList && <VoteList account={account} />}
        {showCreate && <VoteCreate account={account} />}
      </div>
    </div>
  );
}

export default Vote;

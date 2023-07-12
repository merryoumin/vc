import React, { useState, useEffect } from "react";
import VoteList from "../components/VoteList";
import VoteList2 from "../components/VoteList2";
import VoteCreate from "../components/VoteCreate";

function Vote({ account }) {
  const [showList, setShowList] = useState(true);
  const [showList2, setShowList2] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const handleListButtonClick = () => {
    setShowList(true);
    setShowList2(false);
    setShowCreate(false);
  };
  const handleListButtonClick2 = () => {
    setShowList(false);
    setShowList2(true);
    setShowCreate(false);
  };
  const handleCreateButtonClick = () => {
    setShowList(false);
    setShowList2(false);
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
              showList2 ? "bg-teal-200" : ""
            }`}
            onClick={handleListButtonClick2}
          >
            Result
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
      {/* <img
        // className="h-screen w-screen"
        className="h-screen w-screen voteMain"
        src={process.env.PUBLIC_URL + "images/about_f.gif"}
        alt="Example"
      /> */}
      <div className="voteMain w-screen  voteContant flex items-start justify-center p-4">
        {showList && <VoteList account={account} />}
        {showList2 && <VoteList2 account={account} />}
        {showCreate && <VoteCreate account={account} />}
      </div>
    </div>
  );
}

export default Vote;

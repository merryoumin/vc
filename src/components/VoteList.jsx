import React from "react";
import Card from "./Card";
import Card2 from "./Card2";
import axios from "axios";
import Web3 from "web3";

import { useState, useEffect } from "react";
import { GoCheckCircle, GoCircle, GoCircleSlash } from "react-icons/go";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

function VoteList({ account }) {
  const currentTime = new Date();

  const [vote, setVote] = useState([]);
  const [id, setId] = useState();
  const [hash, setHash] = useState();
  const [getVoted, setGetVoted] = useState(0);

  const [vid, setVid] = useState();

  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  let response;

  async function voting() {
    try {
      const response = await axios.get(`/api/vote`);

      setVote(response.data.vote);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPoll(_id) {
    try {
      const response = await contract.methods.getPoll(_id).call();
      setHash(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function setVoted(_id, _num) {
    try {
      await contract.methods
        .voted(account, _id, _num)
        .send({ from: account, to: CONTRACT_ADDRESS });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectChange = (event) => {
    setSelectedOptionIndex(event.target.value);
  };

  async function getVotedfun(_id) {
    console.log("getVotedfun");
    console.log("account : " + account);
    console.log("id " + _id);
    let getResponse;
    try {
      getResponse = await contract.methods.getVoted(account, _id).call();
      console.log(Number(getResponse));
      setGetVoted(Number(getResponse));
      console.log(getResponse);
      console.log("getVotedfun2");
      console.log("account : " + account);
      console.log("id " + _id);
    } catch (error) {
      console.error(error);
    }
    console.log("getVotedfun");
    console.log("account : " + account);
    console.log("id " + _id);
    return Number(getResponse);
  }

  async function sendVoteA(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const voteId = data.get("voteId");
    let prosCount = [...data.getAll("prosCount")].map(Number);
    let consCount = [...data.getAll("consCount")].map(Number);
    let electionCount = [...data.getAll("electionCount")].map(String);

    console.log("voteId" + voteId);
    console.log(prosCount);
    console.log(consCount);
    console.log(electionCount);

    console.log(typeof prosCount);
    console.log(typeof consCount);
    console.log(typeof electionCount);

    console.log(typeof prosCount[0]);
    console.log(typeof consCount[0]);
    console.log(typeof electionCount[0]);

    let prosCountA = [];
    let consCountA = [];
    let electionCountA = [];
    if (thumbsUpClicked == false && thumbsDownClicked == false) {
      alert("check your vote");
      return;
    }
    if (thumbsUpClicked == true) {
      prosCountA.push((prosCount[0] = String(parseInt(prosCount[0]) + 1)));
      setDB(voteId, electionCountA, prosCountA, consCountA);
      setVoted(voteId, 1);
    } else if (thumbsDownClicked == true) {
      consCountA.push((consCount[0] = String(parseInt(consCount[0]) + 1)));
      setDB(voteId, electionCountA, prosCountA, consCountA);
      setVoted(voteId, 2);
    }
    setThumbsUpClicked(false);
    setThumbsDownClicked(false);
  }

  // async function setDB(id, electionCount, prosCount, consCount) {
  //   try {
  //     console.log("setDB");
  //     // const id = 44;
  //     // const electionCount = ["1"];
  //     // const prosCount = [1];
  //     // const consCount = [1];

  //     const response = await axios.put(`/api/vote`, {
  //       id,
  //       electionCount,
  //       prosCount,
  //       consCount,
  //     });
  //     if (response.data.ok) {
  //       console.log(response.data.ok);
  //       console.log(response.data);
  //       console.log("Vote data saved successfully.");
  //     } else {
  //       console.error(
  //         "An error occurred while saving vote data:",
  //         response.data.error
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function setDB(id, electionCount, prosCount, consCount) {
    try {
      const data = {
        id,
        electionCount,
        prosCount,
        consCount,
      };

      const response = await axios.put(`/api/vote`, data);

      if (response.data.ok) {
        console.log(response.data.ok);
        console.log(response.data);
        console.log("Vote data saved successfully.");
      } else {
        console.error(
          "An error occurred while saving vote data:",
          response.data.error
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function sendVoteE(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const electionCount = data.get("electionCount");
    const select = data.get("select");
    const selected = data.get("selected");
    const voteId = data.get("voteId");
    setVoted(voteId, selectedOptionIndex);
  }

  const cardData =
    vote.length > 0
      ? Array(vote.length)
          .fill()
          .map((_, index) => ({
            key: index,
            frontContent: (
              <div className="cardContext items-center justify-center">
                <div>
                  {currentTime < new Date(vote[index].endTime) && (
                    <div className="flex justify-center items-center ">
                      <div className="flex justify-center w-28 items-center  border-8 rounded-full">
                        <GoCircle className="text-8xl text-teal-400" />
                      </div>
                    </div>
                  )}
                  {currentTime > new Date(vote[index].endTime) && (
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center w-28 items-center border-8 rounded-full">
                        <GoCircleSlash className="text-8xl text-teal-400" />
                      </div>
                    </div>
                  )}
                  <div>
                    {/* {getVotedfun(vote[index].id) !== 0 && (
                      <div className="flex justify-center items-center">
                        <div className="flex justify-center w-28 items-center border-8 rounded-full">
                          <GoCheckCircle className="text-8xl text-teal-400" />
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="cardContext_title text-center text-2xl">
                  {vote[index].title}
                </div>
                <div className="mt-4  text-center">
                  <div>{vote[index].context}</div>
                  <div className="mt-2  text-center">
                    {new Date(vote[index].endTime).toLocaleString()}
                  </div>
                </div>
              </div>
            ),
            backContent: (
              <div className="cardContext items-center justify-center">
                <div className="cardContext_title text-center text-2xl">
                  {vote[index].title}
                </div>
                <div className="mt-4">
                  {vote[index].typeOfVote === 0 && (
                    <form onSubmit={sendVoteA}>
                      <div className=" flex justify-center items-center">
                        <div className="flex justify-center w-28 items-center">
                          <div className="m-6">
                            <input
                              type="hidden"
                              value={vote[index].id}
                              name="voteId"
                            />
                            <input
                              type="hidden"
                              value={vote[index].electionCount}
                              name="electionCount"
                            />
                            <input
                              type="hidden"
                              value={vote[index].consCount}
                              name="consCount"
                            />
                            <input
                              type="hidden"
                              value={vote[index].prosCount}
                              name="prosCount"
                            />
                            <FaThumbsUp
                              onClick={() => {
                                setThumbsUpClicked(!thumbsUpClicked);
                                if (thumbsDownClicked)
                                  setThumbsDownClicked(false);
                              }}
                              className={`text-6xl ${
                                thumbsUpClicked ? "text-teal-300" : "text-white"
                              }`}
                            />
                          </div>
                          <input
                            type="submit"
                            value="VOTE"
                            className="text-center  w-20 btmSum h-14 "
                          />
                          <div className="m-6">
                            <FaThumbsDown
                              onClick={() => {
                                setThumbsDownClicked(!thumbsDownClicked);
                                if (thumbsUpClicked) setThumbsUpClicked(false);
                              }}
                              className={`text-6xl ${
                                thumbsDownClicked
                                  ? "text-teal-300"
                                  : "text-white"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                  {vote[index].typeOfVote === 1 && (
                    <form onSubmit={sendVoteE}>
                      {/* {vote[index].id} */}
                      <div className="flex justify-center items-center">
                        <div className=" justify-center items-center">
                          <input
                            type="hidden"
                            value={vote[index].id}
                            name="voteId"
                          />
                          <input
                            type="hidden"
                            value={vote[index].electionCount}
                            name="electionCount"
                          />
                          <input
                            type="hidden"
                            value={vote[index].consCount}
                            name="consCount"
                          />
                          <input
                            type="hidden"
                            value={vote[index].prosCount}
                            name="prosCount"
                          />
                          <select
                            className="select  w-32 h-10 bg-teal-100 rounded-xl  text-center"
                            id={`vote-${index}`}
                            name="select"
                            onChange={handleSelectChange}
                          >
                            {vote[index].election.map((option, optionIndex) => (
                              <option
                                name="selected"
                                key={optionIndex}
                                value={optionIndex}
                              >
                                {optionIndex}
                                {option}
                              </option>
                            ))}
                          </select>
                          <input
                            type="submit"
                            value="VOTE"
                            className="text-center  w-20 ml-3 btmSum h-14 "
                          />
                        </div>
                      </div>
                    </form>
                  )}
                  <div className="mt-2 text-center">{vote[index].context}</div>
                  <div className="mt-2 text-center">
                    {new Date(vote[index].endTime).toLocaleString()}
                    <div className="mt-2 text-xs">
                      한번 투표 하신 투표는 수정 될 수 없습니다.
                    </div>
                  </div>
                </div>
              </div>
            ),
          }))
      : [];

  useEffect(() => {
    const fetchData = async () => {
      await voting();
    };

    fetchData();
  }, []);

  useEffect(() => {
    getVotedfun(44);
  }, [account]);

  useEffect(() => {
    getVotedfun(id);
  }, [id]);
  return (
    <div>
      {cardData.map((card, index) => (
        <div className="mt-10" key={card.key}>
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

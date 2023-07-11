import React from "react";
import Card from "./Card";
import axios from "axios";
import Web3 from "web3";

import { useState, useEffect } from "react";
import { GoCheckCircle, GoCircle, GoCircleSlash } from "react-icons/go";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

function VoteList({ account }) {
  const [vote, setVote] = useState([]);
  const [id, setId] = useState();
  const [hash, setHash] = useState();

  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  let response;
  let electionCount;
  let prosCount;
  let consCount;

  async function voting() {
    try {
      const response = await axios.get(`/api/vote`);

      setVote(response.data.vote);
      console.log(response.data.vote);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPoll(_id) {
    try {
      const response = await contract.methods.getPoll(_id).call();
      setHash(response);
      console.log(hash);
    } catch (error) {
      console.error(error);
    }
  }

  async function setVoted(_id, _num) {
    console.log(account);
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

  const setVotedDb = (_id, _num) => async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    _id = 74;
    electionCount = [1];
    try {
      response = await axios.put(`/api/vote`, {
        id: _id,
        electionCount,
        prosCount,
        consCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function sendVoteA(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const voteId = data.get("voteId");
    console.log(account);
    if (thumbsUpClicked == false && thumbsDownClicked == false) {
      alert("check your vote");
      return;
    }
    if (thumbsUpClicked == true) {
      setVoted(voteId, 1);
    } else if (thumbsDownClicked == true) {
      setVoted(voteId, 2);
    }
    setThumbsUpClicked(false);
    setThumbsDownClicked(false);
  }

  async function sendVoteE(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const voteId = data.get("voteId");
    console.log(account);
    console.log("sendVoteE");
    console.log(voteId);
    console.log(selectedOptionIndex);

    setVoted(voteId, selectedOptionIndex);
    // setVoted(voteId, 1);
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
                  {vote[index].status === 0 && (
                    <div className="flex justify-center items-center ">
                      <div className="flex justify-center w-28 items-center  border-8 rounded-full">
                        <GoCircle className="text-8xl text-teal-400" />
                      </div>
                    </div>
                  )}
                  {vote[index].status === 1 && (
                    <div className="flex justify-center items-center border-2">
                      <div className="flex justify-center w-28 items-center  border-8 rounded-full">
                        <GoCheckCircle className="text-8xl text-teal-400 " />
                      </div>
                    </div>
                  )}
                  {vote[index].status === 2 && (
                    <div className=" flex justify-center items-center border-2">
                      <div className="flex justify-center w-28 items-center  border-8 rounded-full">
                        <GoCircleSlash className="text-8xl text-teal-400 " />
                      </div>
                    </div>
                  )}
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
                      <div className="flex justify-center items-center">
                        <div className=" justify-center items-center">
                          <input
                            type="hidden"
                            value={vote[index].id}
                            name="voteId"
                          />
                          <select
                            className="select  w-32 h-10 bg-teal-100 rounded-xl  text-center"
                            id={`vote-${index}`}
                            onChange={handleSelectChange}
                          >
                            {vote[index].election.map((option, optionIndex) => (
                              <option key={optionIndex} value={optionIndex}>
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
    setVotedDb(1, 1);
    console.log("setVotedDb");
  }, []);
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

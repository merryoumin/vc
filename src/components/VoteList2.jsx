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

function VoteList2({ account }) {
  const currentTime = new Date();

  const [vote, setVote] = useState([]);
  const [id, setId] = useState();
  const [hash, setHash] = useState();
  const [getVoted, setGetVoted] = useState(0);
  const [results, setResults] = useState([]);

  const [vid, setVid] = useState();
  const [votedStatus, setVotedStatus] = useState([]);
  const [sum, setSum] = useState();
  const [fetchVotedResult, setfetchVotedResult] = useState([]);

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
    let getResponse;
    try {
      getResponse = await contract.methods.getVoted(account, _id).call();
      setGetVoted(Number(getResponse));
      console.log(Number(getResponse));
    } catch (error) {
      console.error(error);
    }
    return Number(getResponse);
  }

  async function getVotedRe(_id, _num) {
    let getResponse;
    try {
      getResponse = await contract.methods.getWiner(_id, _num).call();
      console.log(Number(getResponse));
      setGetVoted(Number(getResponse));
    } catch (error) {
      console.error(error);
    }
    return Number(getResponse);
  }
  const fetchVotedResultFun = async () => {
    const status = await Promise.all(
      vote.map(async (item) => {
        const electionLength = item.election.length;
        const electionIndices = Array.from(
          { length: electionLength },
          (_, index) => index + 1
        );
        console.log("item");
        console.log(item);
        console.log(item.id);

        const results = await Promise.all(
          electionIndices.map((index) => getVotedRe(item.id, index))
        );
        results.unshift(0);
        console.log("results");
        console.log(results);
        const _sum = results.reduce((acc, val) => acc + parseInt(val), 0);
        setSum(_sum);
        return setResults(results);
      })
    );
    console.log(status);
  };

  useEffect(() => {
    const fetchVotedStatus = async () => {
      const status = await Promise.all(
        vote.map((item) => getVotedfun(item.id))
      );
      setVotedStatus(status);
    };

    fetchVotedStatus();
  }, [vote]);

  useEffect(() => {
    fetchVotedResultFun();
  }, [vote]);

  const cardData =
    vote.length > 0
      ? Array(vote.length)
          .fill()
          .map((_, index) => ({
            key: index,
            frontContent: (
              <div className="cardContext items-center justify-center">
                <div className="cardContext_title rounded-full bg-emerald-100 text-center text-xl">
                  {vote[index].title}

                  {vote[index].typeOfVote === 0 && (
                    <div className="justify-center  text-4xl items-center">
                      <div className="text-xs">내가 한 투표</div>
                      <div className=" justify-center text-gray-600 items-center">
                        {votedStatus[index] === 1 && <div> 찬성 </div>}
                      </div>
                      <div className=" justify-center  text-gray-600  text-4xl  items-center">
                        {votedStatus[index] === 2 && <div> 반대 </div>}
                      </div>
                      <div className=" justify-center  text-gray-600  text-4xl  items-center">
                        {votedStatus[index] === 0 && <div> 투표 안함 </div>}
                      </div>
                    </div>
                  )}
                  {vote[index].typeOfVote === 1 && (
                    <div className="justify-center items-center">
                      <div className="text-xs">내가 한 투표</div>
                      <div className=" justify-center text-gray-600  text-4xl  items-center">
                        {vote[index].typeOfVote !== 0 && (
                          <div>{vote[index].election[votedStatus[index]]}</div>
                        )}
                      </div>
                      <div className=" justify-center   text-gray-600 items-center">
                        {vote[index].typeOfVote === 0 && <div>투표 안함</div>}
                      </div>
                    </div>
                  )}
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
                {currentTime < new Date(vote[index].endTime) && (
                  <div className="justify-center items-center ">
                    <div className="justify-center  text-gray-500  text-xl text-center bg-white items-center  border-8 rounded-full">
                      투표 결과를 기다리는 중
                    </div>
                    <div className="justify-center text-gray-500 font-medium  m-2 p-12 bg-emerald-100 text-center text-4xl items-center  border-8 rounded-full">
                      아직 투표 중
                    </div>
                  </div>
                )}
                {currentTime > new Date(vote[index].endTime) && (
                  <div className="justify-center items-center ">
                    <div className="justify-center  text-gray-500  rounded-3xl  text-xl text-center m-8  bg-white items-center  border-8 ">
                      <div>
                        <div className="text-gray-500 m-4 text-2xl">
                          {vote[index].title}
                        </div>
                        <div className="text-gray-500  m-4  text-xl">
                          {vote[index].context}
                        </div>
                        <div>결과</div>
                        {vote[index].typeOfVote === 0 && (
                          <div className="text-gray-500  m-4 text-4xl ">
                            {results[0] === 1 ? "찬성" : "반대"}
                          </div>
                        )}
                        {vote[index].typeOfVote === 1 && (
                          <div className="text-gray-500  m-4 text-4xl ">
                            {/* {results} */}
                            {/* {results.indexOf(Math.max(...results))} */}
                            {/* {vote[index].election[1]} */}
                            {
                              vote[index].election[
                                results.indexOf(Math.max(...results))
                              ]
                            }
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="m-4">
                          <div className="text-center text-sm"> 득표수</div>
                          <div className="text-center text-4xl">
                            {Math.max(...results)}
                          </div>
                        </div>
                        <div>
                          <div className="text-center text-sm"> 총투표수</div>
                          <div className="text-center text-4xl">{sum}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
    getVotedfun();
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

export default VoteList2;

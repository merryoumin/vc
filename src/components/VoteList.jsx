import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoCheckCircle, GoCircle, GoCircleSlash } from "react-icons/go";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

function VoteList({ account }) {
  const [vote, setVote] = useState([]);

  async function voting() {
    try {
      const response = await axios.get(`/api/vote`);

      setVote(response.data.vote);
      console.log(response.data.vote);
    } catch (error) {
      console.error(error);
    }
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
                    <div className=" flex justify-center items-center">
                      <div className="flex justify-center w-28 items-center">
                        <div className="m-6">
                          <FaThumbsUp className="text-6xl hover:text-teal-300 text-white" />
                        </div>
                        <div className="m-6">
                          <FaThumbsDown className="text-6xl hover:text-teal-300 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  {vote[index].typeOfVote === 1 && (
                    <form>
                      <div className="flex justify-center items-center">
                        <div className=" justify-center items-center">
                          <select
                            className="select  w-32 h-10 bg-teal-100 rounded-xl  text-center"
                            id={`vote-${index}`}
                          >
                            {vote[index].election.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
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

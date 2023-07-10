import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoCheckCircle, GoCircle, GoCircleSlash } from "react-icons/go";

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
                <div className="mt-4">
                  <div>{vote[index].context}</div>
                  <div className="mt-2">
                    {new Date(vote[index].endTime).toLocaleString()}
                  </div>
                </div>
              </div>
            ),
            backContent: (
              <div>
                Back of Card {index + 1}
                <input type="radio" />
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

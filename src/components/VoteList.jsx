import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

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
              <div>
                <div>{vote[index].title}</div>
                <div>{vote[index].context}</div>
                <div>{vote[index].endTime}</div>
                <div>{vote[index].status}</div>
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

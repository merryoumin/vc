import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styled from "styled-components";
import { SHA256, enc } from "crypto-js";
import axios from "axios";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 20px;
`;

const Desc = styled.div`
  margin-left: 8px;
`;

const ToggleLabel = styled.span`
  display: inline-block;
  width: 100px;
`;

function VoteCreate({ account }) {
  const [isOn, setIsOn] = useState(false);
  const [candidates, setCandidates] = useState(["", ""]);
  const [check, setCheck] = useState(0);
  const [voteId, setVoteId] = useState([]);
  const [vid, setVid] = useState();
  const [hash, setHash] = useState();

  const toggleHandler = () => {
    setIsOn(!isOn);
    setCandidates([]);
  };

  const toggleCandidates = () => {
    if (isOn) {
      setCandidates([...candidates, ""]);
    }
  };

  const handleCandidateChange = (index, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value;
    setCandidates(updatedCandidates);
  };

  async function getvoteId() {
    try {
      const response = await axios.get(`/api/vote`);
      console.log(response.data.vote);
      setVoteId(response.data.vote);
    } catch (error) {
      console.error(error);
    }
  }

  async function setPoll() {
    try {
      await contract.methods
        .makePoll(account, vid, hash)
        .send({ from: account, to: CONTRACT_ADDRESS });
      setCheck(0);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendPoll(e) {
    e.preventDefault();
    let allPoll;
    let response;
    const data = new FormData(e.target);

    const title = data.get("title");
    const context = data.get("context");
    const _endTime = data.get("endTime");

    const dateObject = new Date(_endTime);
    const endTime = dateObject.toISOString();

    let election = [];
    let electionCount = [];
    let prosCount = [];
    let consCount = [];

    let typeOfVote = 0;

    allPoll = title + context + endTime + account;

    if (isOn == true) {
      typeOfVote = 1;
      election = [...Array.from(data.getAll("election"))];
      allPoll = title + context + endTime + account + election;
    }

    // ${process.env.REACT_APP_BACKEND_URL}
    try {
      response = await axios.post(`/api/vote`, {
        title,
        context,
        endTime,
        account,
        election,
        typeOfVote,
        electionCount,
        prosCount,
        consCount,
      });
      setHash("0x" + SHA256(allPoll).toString(enc.Hex));
      setCheck(1);
      // window.location.href = "/vote";
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (check == 1) {
      console.log("check 1" + check);
      getvoteId();
    } else if (check == 2) {
      console.log("check 2" + check);
      setPoll();
    }
  }, [check]);

  useEffect(() => {
    setCheck(2);
  }, [vid]);

  useEffect(() => {
    setVid(voteId?.[voteId.length - 1]?.id);
  }, [voteId]);

  useEffect(() => {
    if (isOn) {
      setCandidates(["", ""]);
    }
    console.log(isOn);
  }, [isOn]);

  return (
    <div className="w-screen border-8 border-gray-100  flex flex-col justify-center items-center">
      <div>
        <form onSubmit={sendPoll}>
          <div className="mt-10">
            <ToggleContainer onClick={toggleHandler}>
              <Toggle
                checked={isOn}
                onChange={toggleHandler}
                icons={{
                  checked: (
                    <div className="ont justify-start text-center">
                      <ToggleLabel className="ON text">
                        Election Vote
                      </ToggleLabel>
                    </div>
                  ),
                  unchecked: (
                    <div className="offt text-center">
                      <ToggleLabel className="OFF text">
                        Against Vote
                      </ToggleLabel>
                    </div>
                  ),
                }}
              />
            </ToggleContainer>
            <div className="text-center mt-8 mb-4">투표 주제</div>
            <input
              type="text"
              name="title"
              placeholder="투표의 주제가 될 것을 적어주세요."
              className="mt-2"
            />
          </div>
          <div>
            <div className="text-center mt-8 mb-4">투표 내용</div>
            <textarea
              name="context"
              className="mt-2"
              placeholder="투표에 대한 설명을 적어주세요."
            />
          </div>
          <Desc>
            {isOn && (
              <div className="text-center mt-8 mb-4">
                <div onClick={toggleCandidates}>후보자</div>
                {candidates.map((candidate, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="election"
                      placeholder="출마하는 후보들을 적어주세요."
                      className="mt-2"
                      value={candidate}
                      onChange={(e) =>
                        handleCandidateChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </Desc>
          <div>
            <div className="text-center mt-8 mb-4">투표 기간</div>
            <input type="date" name="endTime" />
          </div>
          <div className="alrm p-5 mt-10  bg-white rounded-3xl">
            한번 만드신 투표는 수정 될 수 없습니다. 또한 투표의 모든 내용은
            체인에 올라갑니다. 투표 생성 시에 주의 하시고 생성하시기 바랍니다.
          </div>
          <input
            type="submit"
            value="Submit"
            className="text-center btmSum mt-20 h-14 mb-10  mb-4"
          />
        </form>
      </div>
    </div>
  );
}

export default VoteCreate;

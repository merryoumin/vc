import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styled from "styled-components";

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

function VoteCreate() {
  const [isOn, setIsOn] = useState(false);
  const [candidates, setCandidates] = useState(["", ""]);

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

  useEffect(() => {
    if (isOn) {
      setCandidates(["", ""]);
    }
  }, [isOn]);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div>
        <form>
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
              name="contant"
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
          <input
            type="submit"
            value="Submit"
            className="text-center btmSum  h-14 mt-12 mb-4"
          />
        </form>
      </div>
    </div>
  );
}

export default VoteCreate;

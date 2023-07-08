import React, { useState, useEffect } from "react";
import Toggle from "react-styled-toggle";

function VoteCreate() {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div>
        <form>
          <div className="mt-10">
            <Toggle />
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
        </form>
      </div>
    </div>
  );
}

export default VoteCreate;

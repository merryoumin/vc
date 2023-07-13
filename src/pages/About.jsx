import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
function About({ account }) {
  return (
    <div>
      <div className="flex justify-center  mb-40  items-end ">
        <div>
          <img
            className=" h-44 w-52 border-8 bg-neutral-700  rounded-full"
            src={process.env.PUBLIC_URL + "images/contact.gif"}
            alt="aboutPic"
          />
        </div>
      </div>
      <div className="flex justify-center items-end m-10 ">
        <div className="text-4xl mb-9 text-gray-200 text-end">
          Why did we create voting on the blockchain?
        </div>
      </div>
      <div className="m-6 flex ml-4 mt-8 text-xl  w-3/4  text-left  justify-center text-gray-400">
        블록체인은 강력하고 깨끗합니다. VOTE CHAIN은 블록체인을 이용하여 투표
        시스템을 제공합니다. 블록체인의 탈중앙 시스템을 사용하여 보다 투명하고
        깨끗한 시스템을 지향합니다.
      </div>
      <div className="m-6 mb-9 flex ml-20 mt-8 text-xl text-right  w-3/4 items-end  justify-end text-gray-400 ">
        투표를 생성 시 모든 정보는 SHA256을 이용하여 암호화 하여 블록체인에
        올라갑니다. 더 가볍고 안전한 서비스를 이용 할 수 있습니다. 모든 투표는
        공개되어 추적이 가능합니다.
      </div>
      <div className="m-6 flex text-gray-200  mt-18 text-4xl text-left mr-4   items-end  justify-end  ">
        It is hard and pure like a jewel and is oriented toward a voting system.
      </div>
      <div
        style={{ fontFamily: "dia2" }}
        className="mt-48 text-teal-200  text-4xl  text-center"
      >
        No pressure, no diamonds.
      </div>
      <div className="text-sx text-gray-300  text-right mr-12">
        Thomas Carlyle.
      </div>
      <div
        className="flex mt-10 justify-around text-slate-600"
        style={{ fontFamily: "text" }}
      >
        <div className="ml-8  pb-32 ">
          <a
            href="https://github.com/merryoumin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="  h-36 w-36 bg-neutral-700  rounded-3xl"
              src={process.env.PUBLIC_URL + "images/youmin.jpg"}
              alt="aboutPic"
            />
          </a>
          <div className="flex  justify-center items-center">
            <FaGithub />
            <div className=" ml-2 text-center">하유민</div>
          </div>
        </div>
        <div className="mr-8 h-45">
          <a
            href="https://github.com/WhiteNetSource"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className=" h-36  w-36  bg-neutral-700  rounded-3xl"
              src={process.env.PUBLIC_URL + "images/jeayoon.jpeg"}
              alt="aboutPic"
            />
          </a>
          <div className="flex justify-center items-center">
            <FaGithub />
            <div className="ml-2 text-center">황재윤</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

import React, { useState, useEffect } from "react";

function About({ account }) {
  return (
    <div className="flex justify-center items-end ">
      <img
        className="h-screen w-screen main"
        src={process.env.PUBLIC_URL + "images/contact_f.gif"}
        alt="aboutPic"
      />
    </div>
  );
}

export default About;

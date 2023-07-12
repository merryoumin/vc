import React, { useState, useEffect } from "react";

function Main() {
  const [account, setAccount] = useState();

  useEffect(() => {
    if (!account) {
      setAccount(localStorage.getItem("address"));
    }
  }, []);

  return (
    <div className="flex justify-center items-end ">
      <img
        // className="h-screen w-screen"
        className="h-screen w-screen main"
        src={process.env.PUBLIC_URL + "images/1234.gif"}
        alt="mainPic"
      />
    </div>
  );
}

export default Main;

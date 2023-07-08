import React, { useState, useEffect } from "react";

function Main() {
  const [account, setAccount] = useState();

  useEffect(() => {
    if (!account) {
      setAccount(localStorage.getItem("address"));
    }
  }, []);

  return <div>MAIN</div>;
}

export default Main;

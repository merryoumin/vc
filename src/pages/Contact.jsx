import React, { useState, useEffect } from "react";

function Contact() {
  const [account, setAccount] = useState();

  useEffect(() => {
    if (!account) {
      setAccount(localStorage.getItem("address"));
    }
  }, []);

  return (
    <div className="flex">
      <img
        className="h-screen justify-center items-center  w-screen Contact"
        src={process.env.PUBLIC_URL + "images/contact_f.gif"}
        alt="aboutPic"
      />
    </div>
  );
}

export default Contact;

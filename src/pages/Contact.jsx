import React, { useState, useEffect } from "react";

function Contact() {
  const [account, setAccount] = useState();

  useEffect(() => {
    if (!account) {
      setAccount(localStorage.getItem("address"));
    }
  }, []);

  return <div>Contact</div>;
}

export default Contact;

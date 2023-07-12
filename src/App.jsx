import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Vote from "./pages/Vote";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./output.css";

function App() {
  const [account, setAccount] = useState("");

  const connect = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(res[0]);
        localStorage.setItem("address", res[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Install metamask");
      alert("Install metamask");
    }
  };

  useEffect(() => {
    alert("hello");
    if (
      account !== "" &&
      account !== localStorage.getItem("address") &&
      localStorage.getItem("address") !== undefined &&
      localStorage.getItem("address") !== null &&
      localStorage.getItem("address") !== ""
    ) {
      alert("Please connect in the normal way.");
    }
    alert("in");
  }, []);

  return (
    <BrowserRouter>
      <Header account={account} setAccount={setAccount} connect={connect} />
      <Routes>
        <Route path="/" element={<Main account={account} />} />
        <Route path="/vote" element={<Vote account={account} />} />
        <Route path="/about" element={<About account={account} />} />
        <Route path="/contact" element={<Contact account={account} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

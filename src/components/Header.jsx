import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
function Header({ account, setAccount, connect }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  let location = useLocation();
  const navigate = useNavigate();

  function checkLogin() {
    if (!account) {
      if (
        localStorage.getItem("address") == "" ||
        localStorage.getItem("address") == null ||
        localStorage.getItem("address") == undefined
      ) {
        navigate("/");
        alert("Please connect to MetaMask");
      } else {
        setAccount(localStorage.getItem("address"));
      }
    }
  }

  useEffect(() => {
    if (location.pathname == "/vote") {
      checkLogin();
      // console.log(location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, []);

  const onlongclick = ($target, duration, callback) => {
    let timer;
    let isLongClick = false;

    $target.onmousedown = () => {
      timer = setTimeout(() => {
        isLongClick = true;
        callback();
      }, duration);
    };

    $target.onmouseup = () => {
      clearTimeout(timer);
      if (!isLongClick) {
        handleClick();
      }
      isLongClick = false;
    };

    $target.ontouchstart = () => {
      timer = setTimeout(() => {
        isLongClick = true;
        callback();
      }, duration);
    };

    $target.ontouchend = () => {
      clearTimeout(timer);
      if (!isLongClick) {
        handleClick();
      }
      isLongClick = false;
    };
  };

  const handleLongClick = () => {
    if (!account) {
      alert("Connect to MetaMask");
      connect();
    } else {
      localStorage.clear();
      setAccount("");
      alert("Disconnect to MetaMask");
      navigate("/");
    }
  };
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <div className="m-8">
      <div className="flex justify-center ">
        <div className="justify-center">
          <div className=" text-center justify-center">
            <button
              className="circle pulse text-center"
              onClick={handleClick}
              ref={(button) =>
                button && onlongclick(button, 1500, handleLongClick)
              }
            >
              {account && (
                <div className="flex justify-center items-center text-zinc-700">
                  {account.substring(0, 2)}..
                  {account.substring(account.length - 2)}
                </div>
              )}
            </button>
          </div>
          <div
            className=" m-11 text-4xl text-teal-300"
            style={{ fontFamily: "logo" }}
          >
            <a href="/">VOTE CHAIN</a>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-12 right-0 left-0   rounded-full  overflow-auto p-4 shadow-2xl"
        >
          <nav>
            <ul className="flex flex-col justify-between space-y-6 text-gray-600 p-5">
              <li>
                <Link
                  to="/vote"
                  style={{ fontFamily: "text" }}
                  className="flex items-center justify-center block p-2 rounded-full hover:bg-teal-200 rounded-full transition-all duration-200 animate-pulse"
                >
                  Vote
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{ fontFamily: "text" }}
                  className="flex items-center justify-center block p-2 rounded-full hover:bg-teal-200 transition-all duration-200 animate-pulse"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ fontFamily: "text" }}
                  className="flex items-center justify-center block p-2 rounded-full hover:bg-teal-200 transition-all duration-200 animate-pulse"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;

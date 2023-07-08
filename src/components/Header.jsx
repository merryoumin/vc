import React, { useState, useEffect, useRef } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    console.log("isOpen:", isOpen);
  }, [isOpen]);

  const onlongclick = ($target, duration, callback) => {
    let timer;
    let isLongClick = false;

    $target.onmousedown = () => {
      timer = setTimeout(() => {
        isLongClick = true;
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
    alert("work");
  };
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="m-8">
      <div className="flex justify-center">
        <div>
          <button
            ref={(button) => onlongclick(button, 1500, handleLongClick)}
            className="circle pulse text-center"
          ></button>
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-12 right-0 left-0 bg-white overflow-auto p-4 shadow-2xl"
        >
          <nav>
            <ul className="flex flex-col justify-between space-y-6 text-gray-600 p-5">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center block p-2 rounded-md hover:bg-teal-200 transition-all duration-200 animate-pulse"
                >
                  home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center block p-2 rounded-md hover:bg-teal-200 transition-all duration-200 animate-pulse"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center block p-2 rounded-md hover:bg-teal-200 transition-all duration-200 animate-pulse"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;

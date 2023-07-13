import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
function Contact() {
  const [account, setAccount] = useState();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4jfuqdg",
        "template_3q62ptk",
        form.current,
        "laKt2xfRmXUyY9YOu"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("이메일이 성공적으로 보내졌습니다.");
          window.location.href = "/";
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useEffect(() => {
    if (!account) {
      setAccount(localStorage.getItem("address"));
    }
  }, []);

  return (
    <div className=" justify-center items-center ">
      <div className="contant">
        <div
          style={{ fontFamily: "Atomy-Bold" }}
          className="text text-end mr-8 text-6xl text-gray-100"
        >
          Contact
        </div>
        <div
          style={{ fontFamily: "Atomy-Bold" }}
          className="text text-end mr-8 text-6xl  text-gray-100"
        >
          Us
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <div>
            <div>
              <label className="text-gray-600">Name</label>
            </div>
            <input type="text" name="user_name" />
          </div>
          <div>
            <div>
              <label className="text-gray-600">Email</label>
            </div>
            <input type="email" name="user_email" />
          </div>
          <div>
            <div>
              <label className="text-gray-600">Message</label>
            </div>
            <textarea name="message" />
          </div>
          <div className="mt-4">
            <input
              className="text-center btmSum h-14"
              type="submit"
              value="Send"
            />
          </div>
        </form>
      </div>
      <img
        className="h-screen contactPic justify-center items-center  w-screen Contact"
        src={process.env.PUBLIC_URL + "images/contact_f.gif"}
        alt="aboutPic"
      />
    </div>
  );
}

export default Contact;

import React, { useState, useEffect } from "react";
import homeimage from "../images/Untitled.png";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  });
  return (
    <>
      <div className="home-page">
        <Fade left>
          <div className="home-image-div">
            <img src={homeimage} alt="" />
          </div>
        </Fade>
        <Fade right>
          <div className="home-div">
            <h1>{show ? "Happy, to see you back" : "Welcome to Web App"}</h1>
            {/* <h4>{userName}</h4> */}
            <p>
              Frontend of this web app is made from pure react js using
              bootstrap 4 for styling , whereas backend is made up of node js
              with mongodb for data storage.
            </p>
            <Link to="/contact">
              <button className="btn btn-outline-info p-2 w-50 mr-5">
                Join us
              </button>
            </Link>
          </div>
        </Fade>
        <SocialMedia />
      </div>
    </>
  );
};

export default Home;

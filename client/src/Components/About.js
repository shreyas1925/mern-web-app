import React, { useEffect, useState } from "react";
import illu2 from "../images/illu2.jpg";
import illu3 from "../images/illu3.png";
import "../App.css";
import { Fade } from "react-reveal";

import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  });

  return (
    <>
      <Fade left>
        <div className="emp">
          <div className="container emp-profile">
            <form method="GET">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-img">
                    <img
                      src={userData.name === "Shreyas" ? illu2 : illu3}
                      alt="shreyas"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="profile-head">
                    <h5>{userData.name}</h5>
                    <h6>{userData.work}</h6>
                    <p className="profile-rating mt-3 mb-5">
                      RANKINGS: <span> 4/10 </span>
                    </p>

                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="profile-tab"
                          data-toggle="tab"
                          href="#profile"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Developer Skills
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-2">
                  <input
                    type="submit"
                    className="profile-edit-btn"
                    name="btnAddMore"
                    value="Edit Profile"
                  />
                </div>
              </div>

              <div className="row">
                {/* left side url  */}
                <div className="col-md-4">
                  <div className="profile-work">
                    <p> WORK LINK</p>
                    <a
                      href="https://www.github.com/shreyas1925"
                      target="_shreyas"
                    >
                      Github
                    </a>{" "}
                    <br />
                    <a
                      href="https://www.instagram.com/shreyas__19"
                      target="_shreyas"
                    >
                      Instagram
                    </a>{" "}
                    <br />
                    <a
                      href="https://www.linkedin.com/in/shreyas-shettigar-0a695a1a0/"
                      target="_shreyas"
                    >
                      Linkedin
                    </a>{" "}
                    <br />
                    <a href="https://twitter.com/shreyas__19" target="_shreyas">
                      Twitter
                    </a>{" "}
                    <br />
                    <a href="https://youtube.com/tejasff" target="_shreyas">
                      Youtube
                    </a>{" "}
                    <br />
                  </div>
                </div>

                {/* right side data toogle  */}

                <div className="col-md-8 pl-5 about-info">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6 ">
                          <p>{userData.name}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.email}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.phone}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Profession</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.work}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Experience</label>
                        </div>
                        <div className="col-md-6">
                          <p>Intermediate-Full Stack Developer</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Total Projects</label>
                        </div>
                        <div className="col-md-6">
                          <p>50+</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>English Level</label>
                        </div>
                        <div className="col-md-6">
                          <p>Expert</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default About;

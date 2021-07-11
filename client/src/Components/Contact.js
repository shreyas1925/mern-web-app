import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

const Contact = () => {
  const [userData, setUserData] = useState({
    // name: "",
    // email: "",
    // phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      // setUserData({
      //   ...userData,
      //   name: data.name,
      //   email: data.email,
      //   phone: data.phone,
      // });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  });

  // we are storing data in states

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  //  send the data to backend

  const contactForm = async (e) => {
    e.preventDefault();
    const { message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await res.json();

    if (!data) {
      console.log("message not send ");
    } else {
      alert("Message Send");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <Fade left>
                <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                  <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                    <div className="contact_info_image">
                      <img
                        src="https://img.icons8.com/office/24/000000/iphone.png"
                        alt=""
                      />
                    </div>
                    <div className="contact_info_content">
                      <div className="contact_info_title">Phone</div>
                      <div className="contact_info_text">+91 8765430987</div>
                    </div>
                  </div>
                  <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                    <div className="contact_info_image">
                      <img
                        src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png"
                        alt=""
                      />
                    </div>
                    <div className="contact_info_content">
                      <div className="contact_info_title">Email</div>
                      <div className="contact_info_text">
                        shreyasshettigar34@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                    <div className="contact_info_image">
                      <img
                        src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png"
                        alt=""
                      />
                    </div>
                    <div className="contact_info_content">
                      <div className="contact_info_title">Address</div>
                      <div className="contact_info_text">Karnataka,India</div>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form  */}

      <div className="contact_form">
        <Fade bottom>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="contact_form_container py-5">
                  <div className="contact_form_title">Get in Touch </div>
                  <h9>
                    Dear user we have already fetched your details , please
                    enter your message !!
                  </h9>
                  <form method="POST" id="contact_form">
                    <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between"></div>

                    <div className="contact_form_text mt-5">
                      <textarea
                        className="text_field contact_form_message"
                        name="message"
                        value={userData.message}
                        onChange={handleInputs}
                        placeholder="Message"
                        cols="30"
                        rows="10"
                      ></textarea>
                    </div>

                    <div className="contact_form_button">
                      <button
                        type="submit"
                        className="btn btn-outline-info p-2 mt-2"
                        onClick={contactForm}
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default Contact;

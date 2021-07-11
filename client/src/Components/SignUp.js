import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import registerimage from "../images/registerimage.png";
import { Fade } from "react-reveal";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    // I need to change the data to res
    if (data.status === 422 || !data) {
      window.alert("INvalid Registration");
      console.log("INvalid Registration");
    } else {
      window.alert(" Registration Successfull");
      console.log("Successfull Registration");

      history.push("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <Fade bottom>
          <div className="container mt-5">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Register</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <i class="fa fa-user"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="off"
                      value={user.name}
                      onChange={handleInputs}
                      placeholder=" Enter your Name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <i class="fa fa-envelope"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputs}
                      placeholder=" Enter your Email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <i class="fa fa-phone"></i>
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInputs}
                      placeholder="  Enter your Phone"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="work">
                      <i class="fa fa-building"></i>
                    </label>
                    <input
                      type="text"
                      name="work"
                      id="work"
                      autoComplete="off"
                      value={user.work}
                      onChange={handleInputs}
                      placeholder=" Enter your Profession"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i class="fa fa-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                      placeholder=" Enter your Password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <i class="fa fa-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                      placeholder="Confirm Your Password"
                    />
                  </div>

                  <div className="form-group ">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className=" btn btn-outline-info p-2"
                      value="Register"
                      onClick={PostData}
                    />
                  </div>
                </form>
              </div>

              <div className="signup-image">
                <figure>
                  <img
                    src={registerimage}
                    alt="registration pic"
                    className="mb-5"
                  />
                </figure>
                <NavLink to="/login" className="signup-image-link mt-2">
                  I am already registered
                </NavLink>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    </>
  );
};

export default Signup;

import React, { useState, useContext } from "react";
import loginimage from "../images/loginimage.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successfull");
      history.push("/");
    }
  };

  return (
    <>
      <section className="sign-in">
        <Fade right>
          <div className="container mt-5">
            <div className="signin-content ">
              <div className="signin-image">
                <figure>
                  <img src={loginimage} alt="Login pic" />
                </figure>
                <NavLink to="/signup" className="signup-image-link">
                  Create an Account
                </NavLink>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Login</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label htmlFor="email">
                      <i class="fa fa-envelope"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" Enter your  Email"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>

                  <div className="form-group form-button">
                    <button
                      type="button"
                      // type="submit"
                      name="signin"
                      onClick={loginUser}
                      class="btn btn-outline-info pl-4 pr-4"
                    >
                      LOG IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    </>
  );
};

export default Login;

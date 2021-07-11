import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>You have reached the wrong place!!</h2>
          <p className="mb-5">
            The page you are looking for might have been removed or temporarily
            unavailable.
          </p>
          <NavLink to="/"> Back To Homepage </NavLink>
        </div>
      </div>
    </>
  );
};

export default Error;

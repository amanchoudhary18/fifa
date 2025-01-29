import React from "react";
import "./Navbar.css";

const Navbar = ({ openForm }) => {
  return (
    <div className="border navbar">
      <p>FIFA TOURNAMENT</p>
      <button className="registration-btn border" onClick={openForm}>
        Register
      </button>
    </div>
  );
};

export default Navbar;

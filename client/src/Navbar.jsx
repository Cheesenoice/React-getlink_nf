import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Netflix Tool
        </a>
        <a
          href="https://facebook.com/huutrii"
          className="facebook-button"
          target="_blank"
        >
          Facebook
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

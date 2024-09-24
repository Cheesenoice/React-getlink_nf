import React from "react";
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">NETFLIX</div>
      <div className="navbar-links">
        <a
          href="https://www.facebook.com/huutrii/"
          target="_blank"
          rel="noopener noreferrer"
          className="facebook-button"
        >
          Facebook
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

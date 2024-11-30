import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          CÔNG CỤ HỖ TRỢ MÃ
        </a>
        <div className="social-buttons">
          <a
            href="https://t.me/trisvjp"
            className="telegram-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/768px-Telegram_logo.svg.png"
              alt="Telegram"
              className="telegram-icon"
            />
          </a>
          <a
            href="https://facebook.com/huutrii"
            className="facebook-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/900px-2023_Facebook_icon.svg.png"
              alt="Facebook"
              className="facebook-icon"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Designed & Developed by{" "}
        <a
          href="https://www.instagram.com/trisdev_"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          @trisdev_
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/900px-Instagram_icon.png?20200512141346"
            alt="Instagram"
            className="instagram-icon"
          />
        </a>
      </p>
    </footer>
  );
};

export default Footer;

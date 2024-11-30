import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Công cụ được phát triển bởi{" "}
        <a
          href="https://www.instagram.com/trisdev_"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          @trisdev_
        </a>
        .
      </p>
      <p>
        <a href="/privacy-policy" className="footer-link">
          Chính sách bảo mật
        </a>{" "}
        |{" "}
        <a href="/terms-of-use" className="footer-link">
          Điều khoản sử dụng
        </a>
      </p>
    </footer>
  );
};

export default Footer;

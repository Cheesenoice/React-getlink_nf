import React, { useState } from "react";
import "./MailtmChecker.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MailtmChecker = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl1 = import.meta.env.VITE_API_URL1;
  const apiUrl2 = import.meta.env.VITE_API_URL2;

  const getLink = async () => {
    setLoading(true);
    setResult("");

    const selectedApiUrl = email.includes("@yandex.com") ? apiUrl1 : apiUrl2;

    try {
      const response = await fetch(selectedApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.link) {
        setResult(
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            {data.link}
          </a>
        );
      } else {
        setResult(data.error || "Error fetching the link");
      }
    } catch (error) {
      console.error("Error contacting the server:", error);
      setResult("Error contacting the server.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getLink();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mailtm-container">
        <h1 className="title">CÔNG CỤ HỖ TRỢ GỬI MÃ</h1>
        <div className="instruction">
          <p>
            <strong>Cách sử dụng:</strong> <br />
            1. Gửi yêu cầu email từ thiết bị của bạn. <br />
            2. Nhấn nút "Get Link" để nhận liên kết kích hoạt. <br />
            3. Làm theo hướng dẫn trên màn hình để hoàn tất.
          </p>
          <p className="disclaimer">
            * Lưu ý: Công cụ này không lưu trữ bất kỳ thông tin cá nhân nào của
            bạn.
          </p>
        </div>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="email-input"
        />
        <button
          onClick={getLink}
          className="get-link-button"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Nhận liên kết"}
        </button>
        <div className="result-container">
          <strong>Kết quả:</strong>
          <div className="result-box">{result}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MailtmChecker;

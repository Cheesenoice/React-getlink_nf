import React, { useState } from "react";
import "./App.css"; // Make sure the styles are in App.css
import Navbar from "./Navbar";

const MailtmChecker = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getLinkFromBackend = async (email) => {
    try {
      // Send the email to the backend to get the link (backend handles token and API calls)
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Parse the backend response
      const data = await response.json();
      return data.link;
    } catch (error) {
      console.error("Error fetching link from backend:", error);
      return null;
    }
  };

  const getLink = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:5000/get-link", {
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
      setResult("Error contacting the server.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      {/* Rest of the Mailtm Checker component */}
      <div className="mailtm-container">
        <h1 className="title">Tool xác nhận mail Netflix</h1>
        {/* Instruction div */}
        <div className="instruction">
          CÁCH DÙNG <br />
          1. Chọn Send Mail từ TV/điện thoại trước <br />
          2. Sau đó nhấn Get Link <br />
          3. Bấm vào link và nhận mã <br />* làm đúng thứ tự nha ko là sai mã*
        </div>
        <input
          type="text"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <button onClick={getLink} className="get-link-button">
          {loading ? "Loading..." : "Get Link"}
        </button>
        <div className="result-container">
          <strong>Result:</strong>
          <div className="result-box">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default MailtmChecker;

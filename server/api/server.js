const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const getToken = async (loginPayload) => {
  try {
    const response = await axios.post(
      "https://api.mail.tm/token",
      loginPayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.token || null;
  } catch (error) {
    console.error("Error fetching token:", error.message);
    return null;
  }
};

const getMessages = async (token) => {
  try {
    const response = await axios.get("https://api.mail.tm/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return null;
  }
};

const getMessageDetails = async (messageId, token) => {
  try {
    const response = await axios.get(`https://api.mail.tm${messageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching message details:", error.message);
    return null;
  }
};

const extractLink = (messageData) => {
  const dataString = JSON.stringify(messageData);

  if (
    dataString.includes("Your temporary access code") ||
    dataString.includes("Mã truy cập Netflix tạm thời của bạn")
  ) {
    let link =
      dataString
        .split("Get Code")[1]
        ?.split("[")[1]
        ?.split("]")[0]
        .replace("\\", "") ||
      dataString
        .split("Nhận mã")[1]
        ?.split("[")[1]
        ?.split("]")[0]
        .replace("\\", "");
    if (link) {
      link = link.replace("u0026", "&").replace("&", "&");
      return link;
    }
  }

  if (dataString.includes("update-primary-location")) {
    const urlRegex = /https?:\/\/[^\s\]]+/g;
    const urls = dataString.match(urlRegex);
    const specificUrl = urls.find((url) =>
      url.includes("update-primary-location")
    );
    if (specificUrl) {
      return specificUrl;
    }
  }

  return null;
};

app.get("/", (req, res) => {
  res.json({ message: "Hello", password: process.env.PASSWORD });
});

app.post("/get-link", async (req, res) => {
  try {
    const { email } = req.body;
    const password = process.env.PASSWORD; // Ensure this is being retrieved correctly

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const loginPayload = {
      address: email,
      password: password,
    };

    // Fetch token
    const token = await getToken(loginPayload);
    if (!token) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Fetch messages
    const messages = await getMessages(token);
    if (!messages || messages["hydra:totalItems"] === 0) {
      return res.status(404).json({ error: "No messages available." });
    }

    // Fetch first message details
    const firstMessageId = messages["hydra:member"][0]["@id"];
    const messageDetails = await getMessageDetails(firstMessageId, token);

    // Extract link
    const link = extractLink(messageDetails);
    if (link) {
      return res.json({ link });
    } else {
      return res.status(404).json({ error: "No link found in the message" });
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;

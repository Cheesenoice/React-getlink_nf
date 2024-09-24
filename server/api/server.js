const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Add the GET route to respond with "Hello"
app.get("/", (req, res) => {
  res.json("Hello");
});

// Fetch token from Mail.tm API
const getToken = async (loginPayload) => {
  try {
    const response = await axios.post(
      "https://api.mail.tm/token",
      loginPayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Check for success (200-204 response codes)
    if (response.status >= 200 && response.status <= 204) {
      return response.data.token;
    } else {
      throw new Error("Failed to fetch token");
    }
  } catch (error) {
    console.error(
      "Error fetching token:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Fetch messages from Mail.tm API
const getMessages = async (token) => {
  try {
    const response = await axios.get("https://api.mail.tm/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status >= 200 && response.status <= 204) {
      return response.data;
    } else {
      throw new Error("Failed to fetch messages");
    }
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Fetch message details from Mail.tm API
const getMessageDetails = async (messageId, token) => {
  try {
    const response = await axios.get(`https://api.mail.tm${messageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status >= 200 && response.status <= 204) {
      return response.data;
    } else {
      throw new Error("Failed to fetch message details");
    }
  } catch (error) {
    console.error(
      "Error fetching message details:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Extract link from the message data
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

// Handle POST request to fetch the link
app.post("/get-link", async (req, res) => {
  try {
    const { email } = req.body;
    const password = process.env.PASSWORD; // Fetch password from environment variables

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
    console.error("Error processing request:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

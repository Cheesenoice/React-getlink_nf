import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzgm7YxJU9io46iFIKhgKwu8mjkgPFJjQ5tJcDRG4rgXMAoHdjl0nGYKLdeO2qC0ws/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2)); // Format the response nicely
    } catch (error) {
      setResponse("Error submitting data");
    }
  };

  return (
    <div className="App">
      <h1>Email Submission</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div className="response-box">
        <h3>Response:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default App;

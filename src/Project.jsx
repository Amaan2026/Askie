import React, { useState } from "react";

function Project() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response || data.error);
    } catch (error) {
      setResponse("An error occurred...");
    }
    setLoading(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const appStyle = {
    backgroundColor: darkMode ? "#121212" : "#f4f4f4",
    color: darkMode ? "#f4f4f4" : "#121212",
    minHeight: "100vh",
    padding: "3rem 2rem",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: "1.6",
    boxSizing: "border-box",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    border: darkMode ? "1.5px solid #555" : "1.5px solid #ccc",
    backgroundColor: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#eee" : "#111",
    boxShadow: darkMode
      ? "0 2px 6px rgba(255, 255, 255, 0.1)"
      : "0 2px 6px rgba(0, 0, 0, 0.1)",
    outline: "none",
    marginBottom: "1.5rem",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const buttonStyle = {
    padding: "12px 28px",
    cursor: "pointer",
    backgroundColor: darkMode ? "#0000FF" : "#007BFF",
    color: darkMode ? "#fff" : "#000",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
    marginBottom: "2rem",
  };

  const toggleContainer = {
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5rem",
  };

  const toggleLabel = {
    marginLeft: "14px",
    fontWeight: "600",
    userSelect: "none",
    fontSize: "1.1rem",
  };

  return (
    <div style={appStyle}>
      <div style={toggleContainer}>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
        <span style={toggleLabel}>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>

      <h1 style={{ marginBottom: "0.8rem" }}>Askie</h1>
      <p style={{ marginBottom: "2rem" }}>Ask me anything</p>

      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={buttonStyle}
        aria-busy={loading}
      >
        {loading ? "Generating..." : "Submit"}
      </button>

      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "1rem",
          lineHeight: "1.5",
          marginTop: "1.5rem",
        }}
      >
        <strong>Response:</strong>
        <p>{response}</p>
      </div>

      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 28px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 28px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #2196F3;
        }
        input:checked + .slider:before {
          transform: translateX(22px);
        }
        input:focus + .slider {
          box-shadow: 0 0 1px #2196F3;
        }
      `}</style>
    </div>
  );
}

export default Project;

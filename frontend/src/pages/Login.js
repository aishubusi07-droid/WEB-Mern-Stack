import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const endpoint = isRegisterMode ? "/api/register" : "/api/login";

      const response = await axios.post(`${API_BASE}${endpoint}`, formData);

      // Register Success
      if (isRegisterMode) {
        setIsError(false);
        setMessage("Registration successful. You can now log in.");
        setIsRegisterMode(false);
        return;
      }

      // Login Success
      localStorage.setItem("alpUser", JSON.stringify(response.data.user));

      setIsError(false);
      setMessage("Login successful");

      // Redirect to Dashboard
      navigate("/dashboard");

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <section className="card" style={{ maxWidth: "520px", margin: "0 auto" }}>
      <h2 className="page-title">{isRegisterMode ? "Register" : "Login"}</h2>

      <p className="page-subtitle">
        {isRegisterMode
          ? "Create your account with email and password."
          : "Sign in to continue your learning journey."}
      </p>

      <form className="stack" onSubmit={onSubmit}>
        <label>
          Email
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </label>

        <label>
          Password
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={onInputChange}
            required
          />
        </label>

        <button className="btn btn-primary" type="submit">
          {isRegisterMode ? "Register" : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "14px" }}>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setIsRegisterMode((prev) => !prev);
            setMessage("");
          }}
        >
          {isRegisterMode ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>

      {message && (
        <p style={{ marginTop: "14px", color: isError ? "#dc2626" : "#047857" }}>
          {message}
        </p>
      )}
    </section>
  );
}

export default Login;
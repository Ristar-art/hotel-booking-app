import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setLoading, setError } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Navbar } from "../Navbar/Navbar";

export function Login() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.Login.email);
  const password = useSelector((state) => state.Login.password);
  const loading = useSelector((state) => state.Login.isLoading);
  const error = useSelector((state) => state.Login.error);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    try {
      // Make a POST request to your backend API for user authentication
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.json();
        console.log(token);
        localStorage.setItem("accessToken", token.accessToken);

        alert("Login successful");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Login failed");
        dispatch(setError(errorData.error));
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again later.");
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      style={{
        height: "100vh",width: "100vw",
      }}
    >
      {/* <Navbar /> */}
      <div
        style={{
          height: "100vh",width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // textAlign:'center',
          alignItems: "center",
        }}
      >
        <form className="about-section" onSubmit={handleSubmit}>
          <div className="about-intro">
            <h1>User Login</h1>
            <p>Please fill in the required information to login</p>
          </div>
          <input
            className="signup-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <br />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <br />
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className="about-section">
            <button className="signup-button" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

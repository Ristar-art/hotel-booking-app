import React, { useState } from 'react';
import './login.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPassword, setLoading, setError, clearError, setAccessToken } from './loginSlice'; 

export function Login() {
  const navigate = useNavigate();
  

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.Login.name);
  const password = useSelector((state) => state.Login.password);
  const loading = useSelector((state) => state.Login.isLoading);
  const error = useSelector((state) => state.Login.error);
  
  
  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await fetch('https://booking-hotel-25ea1.web.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          password,
        }),
      });

      const data = await response.json();

      if (data.user) {
        alert('Login successful');
        localStorage.setItem('accessToken', data.accessToken);
        navigate("/", { state: { accessToken: data.accessToken } });
      } else {
        alert('Please check your username and password');
      }
    } catch (error) {
      console.error('Error parsing API response:', error);
      alert('An error occurred while logging in. Please try again later.');
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <div className="Login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text" // Add input type attribute
          placeholder="Username"
          value={userName}
          onChange={(e) => dispatch(setName(e.target.value))} // Use dispatch to update the name
        />
        <br />

        <input
          type="password" // Add input type attribute
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))} // Use dispatch to update the password
        />
         <br />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError } from '../Loginpages/loginSlice';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const isLoading = useSelector((state) => state.Login.isLoading); // Get isLoading from Redux store
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken')
  // console.log('accessToken is: ', accessToken)
  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:8000/api/user-profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setEmail(userData.email);
        console.log(userData.email)
        dispatch(setLoading(false)); // Set isLoading to false when data is loaded
      } else {
        setUser(null);
        setEmail(null);
        dispatch(setLoading(false)); // Set isLoading to false even if there's an error
        dispatch(setError('Error fetching user profile'));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      dispatch(setLoading(false)); // Set isLoading to false in case of an error
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');
    console.log(email)
    if (accessToken) {
      if (isLoading) { // Check if isLoading is true
        fetchUserData(accessToken);
      }
    }
  }, [isLoading]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setEmail(null);
  };

  return { user, email, isLoading, handleLogout };
};

export const Navbar = () => {
  const { user, email, isLoading, handleLogout } = useAuth();

  return (
    <nav>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
        <li>
          {email ? (
            <>
              <li>
                <Link to="/userprofile">{email}</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </li>
      </ul>
    </nav>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { auth } from "../../firebase";


export const useLogout = () => {
  const logout = () => {    
    auth.signOut();
    window.location.href = '/';
  }

  return logout;
}

export const Navbar = ({ user }) => {
  const logout = useLogout();

  const handleLogout = () => {
    logout(); 
  }

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
          <Link to="/signup">Sing up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
        <li>
          <button onClick={() => { handleLogout();}}>Log out </button>
        </li>
      </ul>
    </nav>
  );
}

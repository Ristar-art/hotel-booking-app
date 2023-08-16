import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export const Navbar = ({ user }) => {  

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
            <Link to="gallery">Gallery</Link>
          </li>
          <li>
            <Link to="available-rooms">Avilable rooms</Link>
          </li>
        <li>
          <Link to="/singup">Sing up</Link>
        </li>
      
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
          
      </ul>
    </nav>
  );
 }
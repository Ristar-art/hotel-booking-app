import React, { useEffect } from 'react';
import './cancel.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn } from '../authSlice';
import { auth } from "../firebase";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {    
    auth.signOut();
    localStorage.removeItem('isLoggedIn'); // Clear the isLoggedIn status from local storage
    dispatch(setIsLoggedIn(false)); // Update the isLoggedIn state in Redux store
    navigate("/"); // Redirect the user to the home page or login page
  }

  return logout;
}

export default function Cancel() {
  const logout = useLogout();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const accessToken = localStorage.getItem('accessToken');
  const roomNumber = localStorage.getItem('chosenRoom');
  const timeDifference = null;
  const totalPrice = null;
  const checkInDate = null;
  const checkOutDate = null;
  const isbooked = false;

  useEffect(() => {
    
    

    const handleCancel = () => {
     
      fetch(`http://localhost:8000/api/update-room-dates/${roomNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ checkInDate, checkOutDate, isbooked, totalPrice, timeDifference }),
      })
        .then(response => response.json())
        .then(data => {
          
        })
        .catch(error => {
          console.error('Error updating room dates:', error);
        });
    };

    handleCancel();
  }, [dispatch, isLoggedIn, accessToken, roomNumber, checkInDate, checkOutDate, isbooked, totalPrice, timeDifference]);

  const handleLogout = () => {
    logout(); 
  }

  return (
    <div className='display'>
      <h1>Cancelled</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

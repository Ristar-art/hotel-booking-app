import React, { useEffect } from 'react';
import './success.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const accessToken = location.state?.accessToken || '';
  const checkInDate = location.state?.checkInDate; 
  const checkOutDate = location.state?.checkOutDate; 
  const roomNumber = location.state?.chosenRoom;

  const handleChecInOut = () => {
    fetch(`http://192.168.1.19:8000/api/update-room-dates/${roomNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ checkInDate, checkOutDate })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Room dates updated:', data.message);
    })
    .catch(error => {
      console.error('Error updating room dates:', error);
    });
  }

  
  useEffect(() => {
    handleChecInOut();
  }, []);

  return (
    <div className='display'>
      <h1>Successful</h1>
    </div>
  );
}

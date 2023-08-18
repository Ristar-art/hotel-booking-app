import React, { useEffect } from 'react';
import './success.css';

export default function Success() {
  const accessToken = localStorage.getItem('accessToken');
  const roomNumber = localStorage.getItem('chosenRoom');
  const checkInDate = localStorage.getItem('checkInDate');
  const checkOutDate = localStorage.getItem('checkOutDate');
  const isBooked = true;

  const handleChecInOut = () => {
    fetch(`http://192.168.1.19:8000/api/update-room-dates/${roomNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ checkInDate, checkOutDate, isBooked })
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
    if (accessToken && roomNumber && checkInDate && checkOutDate) {
      handleChecInOut();
    } 
  }, [accessToken, roomNumber, checkInDate, checkOutDate]);

  return (
    <div className='display'>
      <h1>Successful</h1>
    </div>
  );
}

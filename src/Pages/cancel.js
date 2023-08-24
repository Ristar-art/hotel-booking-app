import React,{ useEffect } from 'react';
import './cancel.css'

export default function Cancel() {

  const accessToken = localStorage.getItem('accessToken');
  const roomNumber = localStorage.getItem('chosenRoom');
  const timeDifference = localStorage.getItem('timeDifference');
  const totalPrice = localStorage.getItem('totalPrice')
  const checkInDate = null;
  const checkOutDate = null;
  const isbooked = false;
  

  const handleCancell = () => {
    

    fetch(`http://192.168.1.19:8000/api/update-room-dates/${roomNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ checkInDate, checkOutDate, isbooked, totalPrice, timeDifference })
      
    })
    .then(response => response.json())
    .then(data => {
      console.log('Room dates updated:', data.message);
    })
    .catch(error => {
      console.error('Error updating room dates:', error);
    });
  }
  return (
    <div className='display' >
       {handleCancell()}
      <h1>Cancelled</h1>
    </div>
  );
}
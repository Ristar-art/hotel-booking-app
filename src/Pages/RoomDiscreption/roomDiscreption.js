import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux'; 
import './RoomDescription.css';
import Footer from '../../Components/Footer/footer';

const RoomDescriptionPage = () => {
  
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);
  

  
  const accessToken = localStorage.getItem('accessToken')
  const checkInDate = localStorage.getItem('checkInDate');
  const checkOutDate = localStorage.getItem('checkOutDate');
  const isbooked = true;
  const timeDifference = localStorage.getItem('timeDifference');
  const totalPrice = localStorage.getItem('totalPrice')
  console.log('totalPrice is : ', totalPrice)
  useEffect(() => {
    fetch(`https://booking-hotel-25ea1.firebaseapp.com/room/${roomNumber}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setRoom(data);
      })
      .catch(error => {
        console.error('Error fetching room information:', error);
      });
  }, [roomNumber, accessToken]); 
 
 
  const handleBooking = () => {

    
   
    const items = [
      {
        price_data: {
          currency: "zar",
          product_data: {
            roomNumber: room.roomNumber,
            roomType: room.roomType,
          },
          unit_amount: totalPrice, 
        },
        quantity: 1,
      },
    ];

    fetch(`https://booking-hotel-25ea1.firebaseapp.com/api/update-room-dates/${roomNumber}`, {
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
  
    
   
    fetch("https://booking-hotel-25ea1.firebaseapp.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ items }),
      
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location.href = url; 
      })
      .catch((e) => {
        console.error(e.error);
      });
    
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="room-description-page">
      <img
        src={room.roomPhoto}      
        alt={room.roomType} 
        className="room-image"
      />
      <br></br>
      <div className="room-info">
        <h3>{room.roomType}</h3>
        <br></br>
        <p>{room.description}</p>
        
        <button onClick={handleBooking}>Book.</button>
      </div>
      <br></br>
      <div className='footer'>
      {<Footer/>}
      </div>
    </div>
  );
};

export default RoomDescriptionPage;

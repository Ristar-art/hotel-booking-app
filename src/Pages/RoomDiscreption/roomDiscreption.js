import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import './RoomDescription.css';
//import { useLocation } from 'react-router-dom';

const RoomDescriptionPage = () => {
  //const location = useLocation();
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);

  
  // Access accessToken directly from Redux state
  const accessToken = useSelector(state => state.Login.accessToken);
 // const { checkInDate, checkOutDate } = location.state || {};


  useEffect(() => {
    fetch(`http://192.168.1.19:8000/room/${roomNumber}`, {
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
          unit_amount: room.rentPerDay * 100, 
        },
        quantity: 1,
      },
    ];
    
   
    fetch("http://192.168.1.19:8000/create-checkout-session", {
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
        window.location.href = url; // Redirect to the checkout URL
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
        alt={room.roomType} // Add alt text for accessibility
        className="room-image"
      />
      <br></br>
      <div className="room-info">
        <h3>{room.roomType}</h3>
        <br></br>
        <p>{room.description}</p>
        {/* Include other room information here */}
        <button onClick={handleBooking}>Book.</button>
      </div>
    </div>
  );
};

export default RoomDescriptionPage;

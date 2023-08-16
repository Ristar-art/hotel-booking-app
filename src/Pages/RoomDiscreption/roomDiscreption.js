import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import './RoomDescription.css';

const RoomDescriptionPage = () => {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);
  
  // Access accessToken directly from Redux state
  const accessToken = useSelector(state => state.Login.accessToken);

  useEffect(() => {
    fetch(`http://192.168.1.19:8000/room/${roomNumber}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Use the accessToken directly here
      }
    })
      .then(response => response.json())
      .then(data => {
        setRoom(data);
      })
      .catch(error => {
        console.error('Error fetching room information:', error);
      });
  }, [roomNumber, accessToken]); // Make sure to include accessToken in the dependency array
  console.log("roomNumber:", roomNumber);
  const handleBooking = () => {
    console.log("roomNumber from room object:", room.roomNumber);
    const items = [
      {
        price_data: {
          currency: "zar",
          product_data: {
            roomNumber: room.roomNumber,
            roomType: room.roomType,
          },
          unit_amount: room.rentPerDay * 100, // Convert to cents
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

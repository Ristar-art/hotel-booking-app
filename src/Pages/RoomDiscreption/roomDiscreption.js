import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import './RoomDescription.css';
import Footer from '../../Components/Footer/footer';

const RoomDescriptionPage = () => {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);
  const accessToken = localStorage.getItem('accessToken');
  const checkInDate = localStorage.getItem('checkInDate');
  const checkOutDate = localStorage.getItem('checkOutDate');
  const isbooked = true;
  const totalPrice = localStorage.getItem('totalPrice');
  const numberOfDays = localStorage.getItem('numberOfDays');

  useEffect(() => {
    const fetchRoomInformation = async () => {
      try {
        const roomResponse = await fetch(`http://localhost:8000/api/room/${roomNumber}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!roomResponse.ok) {
          throw new Error('Failed to fetch room details');
        }
        const data = await roomResponse.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room information:', error);
      }
    };

    fetchRoomInformation();
  }, [roomNumber, accessToken]);

  const handleBooking = async () => {
    try {
      // First, update room dates
      const updateRoomResponse = await fetch(`http://localhost:8000/api/update-room-dates/${roomNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ checkInDate, checkOutDate, isbooked, totalPrice, numberOfDays }),
      });

      if (!updateRoomResponse.ok) {
        throw new Error('Failed to update room dates');
      }

      // Then, create a checkout session
      const items = [
        {
          price_data: {
            currency: 'zar',
            product_data: {
              roomNumber: room.roomNumber,
              roomType: room.roomType,
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ];

      const createCheckoutResponse = await fetch('http://localhost:8000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ items }),
      });

      if (createCheckoutResponse.ok) {
        const { url } = await createCheckoutResponse.json();
        window.location.href = url;
      } else {
        throw new Error('Failed to create a checkout session');
      }
    } catch (error) {
      console.error(error);
    }
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
        <button onClick={handleBooking}>Book</button>
      </div>
      <br></br>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default RoomDescriptionPage;

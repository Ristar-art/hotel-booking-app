import React, { useState, useEffect } from 'react';
import './availableRoom.css';
import { Link, useLocation } from 'react-router-dom';

function AvailableRooms() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const location = useLocation();
  const accessToken = location.state?.accessToken || ''; // Get accessToken from location state

  useEffect(() => {
    fetch('http://192.168.1.19:8000/api/available-rooms', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Add the accessToken to the headers
      }
    })
      .then(response => response.json())
      .then(data => {
        setAvailableRooms(data.availableRooms);
      })
      .catch(error => {
        console.error('Error fetching available rooms:', error);
      });
  }, [accessToken]); // Include accessToken in the dependency array

  return (
    <div className='container'>
      <div className="room-list">
         {availableRooms.map((room, index) => (
          <div key={index} className="room-card">
           <img src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
            <div className="room-info">
             <h3>Room {room.roomNumber}</h3>
                <p>R{room.rentPerDay}</p>
              <Link
                to={{
                  pathname: `/room/${room.roomNumber}`,
                  state: { accessToken: accessToken } // Pass accessToken in the state
                }}
              >
                Description of the room
              </Link>
             </div>
          </div>
          ))}
       </div>
    </div>
  );
}

export default AvailableRooms;

import React, { useEffect } from 'react';
import './availableRoom.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvailableRooms } from './availableRoomsSlice';

function AvailableRooms() {
  const availableRooms = useSelector(state => state.availableRooms);
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(fetchAvailableRooms(accessToken));
  }, [dispatch, accessToken]);

  const handleRoomSelect = (roomNumber) => {
    // Store the chosen room in local storage
    localStorage.setItem('chosenRoom', roomNumber);
  };

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
                  state: {
                    accessToken: accessToken,
                  }
                }}
                onClick={() => handleRoomSelect(room.roomNumber)} // Call the function to save the chosen room
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

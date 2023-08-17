import React, { useEffect } from 'react';
import './availableRoom.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvailableRooms } from './availableRoomsSlice';

function AvailableRooms() {
  const availableRooms = useSelector(state => state.availableRooms);
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = location.state?.accessToken || '';
 // const { checkInDate, checkOutDate } = location.state;

  useEffect(() => {
    dispatch(fetchAvailableRooms(accessToken));
  }, [dispatch, accessToken]);

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
                    // checkInDate: checkInDate,       // Pass checkInDate
                    // checkOutDate: checkOutDate      // Pass checkOutDate
                  }
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

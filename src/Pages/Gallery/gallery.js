import React, { useEffect } from 'react';
import './gallery.css'; // Import your CSS
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from './gallerySlice'; 

function Gallery() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms); // Use the new slice name 'rooms'

  useEffect(() => {
    dispatch(fetchAllRooms()); // Dispatch the fetchAllRooms action
  }, [dispatch]);

  return (
    <div className='container'>
      <div className="room-gallery">
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <img src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
            <div className="room-info">
              <h3>Room {room.roomNumber}</h3>
              <p>R{room.rentPerDay}</p>
              {/* Link to the room description */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

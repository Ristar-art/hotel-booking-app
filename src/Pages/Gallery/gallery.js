import React, { useEffect } from 'react';
import './gallery.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from './gallerySlice';

function Gallery() {
  const dispatch = useDispatch();
  const pictures = useSelector(state => state.gallery.pictures);
 

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  return (
    <div className='about-container'>
      <div className="about-intro">
        {/* <h1>Gallery</h1> */}
      </div>
      <div className="about-content">
        {pictures.map((room, index) => (
          <div key={index} className="about-section room-card">
            <img src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
            <h2>Room {room.roomNumber}</h2>
            <p>{room.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

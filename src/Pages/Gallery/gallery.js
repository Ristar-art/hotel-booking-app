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
      <div className='container'>
        <div className="room-gallery">
          {pictures.map((room, index) => (
            <div key={index} className="room-card">
              <img src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Gallery;
  
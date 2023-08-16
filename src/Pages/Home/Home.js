import React, { useState } from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const images = [
    '2d207d2b(1).jpg',
    'b3afd7e9.jpg',
    // Add more image filenames here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleSearchRooms = () => {
    const { state } = location;
    if (state && state.accessToken) {
      const accessToken = state.accessToken;     
      navigate('/available-rooms'); // Navigate to the desired page
    } else {
      console.log('Access Token not found in state');
    }
  };

  return (
    <div className='home'>
      <h1>Home Page</h1>
      <div className='image-gallery'>
        <img
          src={`/images/${images[currentIndex]}`}
          alt='Gallery'
        />
        <div className='booking-container'>
          <div className='date-input'>
            <label className='date-label' htmlFor='checkInDate'>
              Check In Date:
            </label>
            <input
              className='date-picker'
              type='date'
              id='checkInDate'
              value={checkInDate}
              onChange={handleCheckInDateChange}
            />
          </div>
          <div className='date-input'>
            <label className='date-label' htmlFor='checkOutDate'>
              Check Out Date:
            </label>
            <input
              className='date-picker'
              type='date'
              id='checkOutDate'
              value={checkOutDate}
              onChange={handleCheckOutDateChange}
            />
          </div>
          <div className='button-container'>
            <button className='search-button' onClick={handleSearchRooms}>
              Search Available Rooms
            </button>
          </div>
        </div>
        <div className='image-nav-buttons'>
          <button className='prev' onClick={handlePrevClick}>
            <i className='fas fa-chevron-left'></i>
          </button>
          <button className='next' onClick={handleNextClick}>
            <i className='fas fa-chevron-right'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckInDate, setCheckOutDate } from './homeSlice';

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const images = ['2d207d2b(1).jpg', 'b3afd7e9.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);

  const checkInDate = useSelector(state => state.home.checkInDate);
  const checkOutDate = useSelector(state => state.home.checkOutDate);

  const dispatch = useDispatch();

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCheckInDateChange = event => {
    dispatch(setCheckInDate(event.target.value));
  };

  const handleCheckOutDateChange = event => {
    dispatch(setCheckOutDate(event.target.value));
  };

  const handleSearchRooms = () => {
    if (checkInDate && checkOutDate) { // Only allow searching when both dates are selected
      const { state } = location;
      if (state && state.accessToken) {
        const accessToken = state.accessToken;

        const newState = {
          accessToken: accessToken,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        };

        navigate('/available-rooms', { state: newState });
      } else {
        console.log('Access Token not found in state');
      }
    } else {
      console.log('Please select both check-in and check-out dates.');
    }
  };

  return (
    <div className='home'>
      <h1>Home Page</h1>
      <div className='image-gallery'>
        <img src={`/images/${images[currentIndex]}`} alt='Gallery' />
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
            <button
              className='search-button'
              onClick={handleSearchRooms}
              disabled={!checkInDate || !checkOutDate} // Disable button if dates are not selected
            >
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

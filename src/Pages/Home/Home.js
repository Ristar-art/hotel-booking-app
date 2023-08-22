import React, { useState, useEffect } from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../Components/Footer/footer';

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const images = ['2d207d2b(1).jpg', 'b3afd7e9.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  useEffect(() => {
    const storedCheckInDate = localStorage.getItem('checkInDate');
    const storedCheckOutDate = localStorage.getItem('checkOutDate');
    
   
    if (storedCheckInDate) {
      setCheckInDate(storedCheckInDate);
    }
    if (storedCheckOutDate) {
      setCheckOutDate(storedCheckOutDate);
    }
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => {
      clearInterval(interval); 
    };

  }, []);

  

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
    const newCheckInDate = event.target.value;
    setCheckInDate(newCheckInDate);
    localStorage.setItem('checkInDate', newCheckInDate);
  };

  const handleCheckOutDateChange = event => {
    const newCheckOutDate = event.target.value;
    setCheckOutDate(newCheckOutDate);
    localStorage.setItem('checkOutDate', newCheckOutDate);
  };

  const handleSearchRooms = () => {
    if (checkInDate && checkOutDate) {
      const { state } = location;
      if (state && state.accessToken) {
        const accessToken = state.accessToken;

        const newState = {accessToken: accessToken, };

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
      <div className='image-gallery-container'>

      <div className='image-gallery'>
        <img src={`/images/${images[currentIndex]}`} alt='Gallery'  />
        <div className='abide-hotel'>
            <h1>Abide in me hotel</h1>
          </div>
         
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
              disabled={!checkInDate || !checkOutDate} 
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
      
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

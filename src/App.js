import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './Components/Navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { About } from './Pages/About/About';
import RoomDescriptionPage from './Pages/RoomDiscreption/roomDiscreption';
import { Home } from './Pages/Home/Home';
import AdminPanel from './Pages/Admin/adminPanel';
import Success from './Pages/success';
import Cancel from './Pages/cancel';
import Gallery from './Pages/Gallery/gallery';
import AvailableRooms from './Pages/AvailableRoom/availableRoom';
import SignUp from './Components/SignUp/signUp';
import { setIsLoggedIn, setIsLoading } from './authSlice';
import {Login} from './Components/Loginpages/login'
import UserProfile from './Pages/UresProfile/userprofile';
import History from './Pages/History/histoty';


function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if the access token is present in local storage
    const token = localStorage.getItem('accessToken');
    console.log('tokent is: ', token)
    if (token) {
      dispatch(setIsLoggedIn(true));
    }
    dispatch(setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/signup" element={<SignUp />} />       
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />
        <Route path="/room/:roomNumber" element={<RoomDescriptionPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/history" element={<History/>} />
        
      </Routes>
    </div>
  );
}

export default App;

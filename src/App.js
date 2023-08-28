import React, { useEffect } from 'react';
import './App.css';
import {  useDispatch, useSelector } from 'react-redux';

import { Navbar } from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';

import { About } from './Pages/About/About';
import RoomDescriptionPage from './Pages/RoomDiscreption/roomDiscreption';
import { Home } from './Pages/Home/Home';
import AdminPanel from './Pages/Admin/adminPanel';
import Success from './Pages/success';
import Cancel from './Pages/cancel';
import Gallery from './Pages/Gallery/gallery';
import AvailableRooms from './Pages/AvailableRoom/availableRoom';
import SignUp from './Components/SignUp/signUp';
import { auth } from './firebase';
import { setIsLoggedIn, setIsLoading } from './authSlice';
import { Login } from './Components/Loginpages/logIn';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      dispatch(setIsLoggedIn(!!user));
      dispatch(setIsLoading(false));
    });
    
    auth.signOut();

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log('logged in?', isLoggedIn);
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />      
       
        <Route path="/signup" element={<SignUp/>} />
        {!isLoggedIn ? (
          <Route path="/login" element={<Login/>} />

        ) : (
          <>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/available-rooms" element={<AvailableRooms />} />
            <Route path="/room/:roomNumber" element={<RoomDescriptionPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

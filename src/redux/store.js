import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../Components/SignUp/singUpSlice'; // Make sure the path is correct
import loginSlice from '../Components/Login/loginSlice';
import roomReducer from '../Pages/Admin/roomReducer';

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    Login: loginSlice, 
    rooms: roomReducer, // <-- Add a comma here
  },
});

export default store;

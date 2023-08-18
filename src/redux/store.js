import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../Components/SignUp/singUpSlice'; // Make sure the path is correct
import loginSlice from '../Components/Login/loginSlice';
import roomReducer from '../Pages/Admin/roomReducer';
import availableRoomsSlice from '../Pages/AvailableRoom/availableRoomsSlice';
import gallerySlice from '../Pages/Gallery/gallerySlice';



const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    Login: loginSlice, 
    rooms: roomReducer,     
    availableRooms: availableRoomsSlice,
    gallery: gallerySlice,    
  },
});

export default store;

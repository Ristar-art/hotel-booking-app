import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../Components/SignUp/singUpSlice'; 
import loginSlice from '../Components/Loginpages/loginSlice';
import roomReducer from '../Pages/Admin/roomReducer';
import availableRoomsSlice from '../Pages/AvailableRoom/availableRoomsSlice';
import gallerySlice from '../Pages/Gallery/gallerySlice';
import bookedRoomsSlice from '../Pages/Admin/bookedRoomsSlice';
import authReducer from '../authSlice';



const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    Login: loginSlice, 
    auth: authReducer,
    rooms: roomReducer,     
    availableRooms: availableRoomsSlice,
    gallery: gallerySlice,
    bookedRooms: bookedRoomsSlice,    
  },
});

export default store;

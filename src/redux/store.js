import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../Components/SignUp/singUpSlice'; // Make sure the path is correct
import loginSlice from '../Components/Login/loginSlice';
import roomReducer from '../Pages/Admin/roomReducer';
import homeSlice from '../Pages/Home/homeSlice';
import availableRoomsSlice from '../Pages/AvaulableRoom/availableRoomsSlice';

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    Login: loginSlice, 
    rooms: roomReducer, 
    home: homeSlice,
    availableRooms: availableRoomsSlice,
  },
});

export default store;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllRooms = createAsyncThunk(
  'gallery/fetchAllRooms', 
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('this happens - getting all rooms')
      const response = await fetch('https://booking-hotel-25ea1.firebaseapp.com/api/all-rooms', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();   
      console.log(' pictures: ', data.pictures)
      return data.pictures; 
    } catch (error) {
      console.error('Error fetching all rooms:', error);
      throw error; // Throw the error to be handled by the thunk middleware
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    pictures: [], 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.pictures = action.payload;
    });
  },
});

export default gallerySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllRooms = createAsyncThunk(
  'gallery/fetchAllRooms', 
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('https://192.168.1.19:8000/api/all-rooms', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();   
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

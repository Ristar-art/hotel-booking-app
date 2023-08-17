import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllRooms = createAsyncThunk(
  'gallery/fetchAllRooms',
  async (accessToken) => {
    const response = await fetch('http://192.168.1.19:8000/api/all-rooms', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();   
    return data.pictures; // Update to match the response structure
    
  }
);
const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    pictures: [], // Initialize with an empty array
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.pictures = action.payload; // Assign the payload to the pictures property
    });
  },
});

export default gallerySlice.reducer;

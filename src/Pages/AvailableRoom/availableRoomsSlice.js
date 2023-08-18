import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch available rooms
export const fetchAvailableRooms = createAsyncThunk(
  'availableRooms/fetchAvailableRooms',
  async (accessToken) => {
    const response = await fetch('http://192.168.1.19:8000/api/available-rooms', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    return data.availableRooms;
  }
);

// Create the slice
const availableRoomsSlice = createSlice({
  name: 'availableRooms',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableRooms.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default availableRoomsSlice.reducer;

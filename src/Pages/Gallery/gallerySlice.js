import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllRooms = createAsyncThunk(
  'rooms/fetchAllRooms',
  async (accessToken) => {
    const response = await fetch('http://192.168.1.19:8000/api/all-rooms', { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    return data.rooms; // Assuming 'rooms' is the key for all room data in the response
  }
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default roomsSlice.reducer;

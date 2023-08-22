import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchBookedRooms = createAsyncThunk(
  'bookedRooms/fetchBookedRooms',
  async (accessToken) => {
    const response = await fetch('http://192.168.1.19:8000/api/booked-rooms', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    return data.bookedRooms;
  }
);

const bookedRoomsSlice = createSlice({
  name: 'bookedRooms',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookedRooms.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default bookedRoomsSlice.reducer;

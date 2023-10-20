import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchBookedRooms = createAsyncThunk(
  'bookedRooms/fetchBookedRooms',
  async (accessToken) => {
    
    const response = await fetch('http://localhost:8000/api/booked-rooms', {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    console.log('bookedRooms: ',data.bookedRooms)
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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAvailableRooms = createAsyncThunk(
  'availableRooms/fetchAvailableRooms',
  async (accessToken) => {
    console.log('this happens - to fetch all room')
    const response = await fetch('https://booking-hotel-25ea1.firebaseapp.com/api/available-rooms', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    console.log('availableRooms: ',data.availableRooms);
    return data.availableRooms;
  }
);


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

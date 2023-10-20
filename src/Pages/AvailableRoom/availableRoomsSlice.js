import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAvailableRooms = createAsyncThunk(
  'availableRooms/fetchAvailableRooms',
  async (accessToken) => {
    
    const response = await fetch('http://localhost:8000/api/available-rooms', {
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

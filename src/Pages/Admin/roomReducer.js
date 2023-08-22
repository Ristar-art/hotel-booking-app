// roomsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const addNewRoom = createAsyncThunk(
  'rooms/addNewRoom',
  async (newRoomData) => {
    const response = await fetch('http://192.168.1.19:8000/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoomData),
    });

    if (!response.ok) {
      throw new Error('Failed to add room');
    }

    const responseData = await response.json();
    return responseData;
  }
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewRoom.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default roomsSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const chosenRoomSlice = createSlice({
  name: 'chosenRoom',
  initialState: null,
  reducers: {
    setChosenRoom: (state, action) => {
      return action.payload;
    },
    clearChosenRoom: (state) => {
      return null;
    },
  },
});

export const { setChosenRoom, clearChosenRoom } = chosenRoomSlice.actions;
export default chosenRoomSlice.reducer;

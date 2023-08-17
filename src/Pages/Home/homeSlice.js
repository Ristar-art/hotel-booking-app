import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkInDate: '',
  checkOutDate: '',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCheckInDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
  },
});

export const { setCheckInDate, setCheckOutDate } = homeSlice.actions;
export default homeSlice.reducer;



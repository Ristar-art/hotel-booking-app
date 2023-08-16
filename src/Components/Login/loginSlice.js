import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  password: '',
  isLoading: false,
  error: null,
  accessToken: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setName,
  setPassword,
  setLoading,
  setError,
  clearError,
  setAccessToken,
} = loginSlice.actions;

export default loginSlice.reducer;

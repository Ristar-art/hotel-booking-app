// signUpSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
  isLoading: false,
  error: null,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordRepeat: (state, action) => {
      state.passwordRepeat = action.payload;
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
    clearForm: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.passwordRepeat = '';
      state.error = null;
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setPasswordRepeat,
  setLoading,
  setError,
  clearError,
  clearForm,
} = signUpSlice.actions;

export default signUpSlice.reducer;
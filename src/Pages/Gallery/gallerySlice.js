import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllRooms = createAsyncThunk(
  'gallery/fetchAllRooms',
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await fetch('http://localhost:8000/api/all-rooms', {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`
        }
      });
       
      if (!response.ok) {
        // Handle non-successful response (e.g., status code 404 or 500)
        if (response.status === 404) {
          throw new Error('No rooms found.'); // Customize the error message as needed
        } else if (response.status === 500) {
          throw new Error('Internal server error.'); // Customize the error message as needed
        } else {
          throw new Error('Failed to fetch rooms.'); // Default error message
        }
      }

      const data = await response.json();
     
      return data.pictures;
    } catch (error) {
      console.error('Error fetching all rooms:', error);
      throw error; // Throw the error to be handled by the thunk middleware
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    pictures: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.pictures = action.payload;
    });
  },
});

export default gallerySlice.reducer;

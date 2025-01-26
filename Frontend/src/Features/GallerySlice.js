import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunk to fetch data from an API
export const fetchGalleryData = createAsyncThunk('GalleryData/fetchGalleryData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getGalleryImages'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const GallerySlice = createSlice({
  name: 'GalleryData',
  initialState: {
    GalleryImage: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryData.fulfilled, (state, action) => {
        state.loading = false;
        state.GalleryImage = action.payload; // Update state with the fetched data
      })
      .addCase(fetchGalleryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default GallerySlice.reducer;

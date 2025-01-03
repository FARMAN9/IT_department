import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchMainData = createAsyncThunk('MainData/fetchMainData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getMainImages'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const MainImageSlice = createSlice({
  name: 'MainImagesData',
  initialState: {
    value: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainData.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload; // Update state with the fetched data
      })
      .addCase(fetchMainData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default MainImageSlice.reducer;

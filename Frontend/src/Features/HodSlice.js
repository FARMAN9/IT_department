import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchHodData = createAsyncThunk('HodData/fetchHodData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getHodInfo');
    console.log('data',response.data.data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const HodSlice = createSlice({
  name: 'HodinfoData',
  initialState: {
    HodInfo: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHodData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHodData.fulfilled, (state, action) => {
        state.loading = false;
        state.HodInfo = action.payload; // Update state with the fetched data
      })
      .addCase(fetchHodData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default HodSlice.reducer;
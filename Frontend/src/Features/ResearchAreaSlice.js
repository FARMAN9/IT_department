import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchResearchAreasData = createAsyncThunk('ResearchAreasData/fetchResearchAreasData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getResearchAreas'); // Replace with your API endpoint
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const ResearchAreaSlice = createSlice({
  name: 'ResearchAreasData',
  initialState: {
    researchAreas: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResearchAreasData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResearchAreasData.fulfilled, (state, action) => {
        state.loading = false;
        state.researchAreas = action.payload; // Update state with the fetched data
      })
      .addCase(fetchResearchAreasData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default ResearchAreaSlice.reducer;
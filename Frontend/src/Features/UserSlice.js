import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchFacultyData = createAsyncThunk('FacultyData/fetchFacultyData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getFaculty'); // Replace with your API endpoint
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const FacultySlice = createSlice({
  name: 'FacultyData',
  initialState: {
    faculty: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacultyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacultyData.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload; // Update state with the fetched data
      })
      .addCase(fetchFacultyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default FacultySlice.reducer;
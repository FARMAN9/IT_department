import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchDepartmentActivitesCalenderData = createAsyncThunk('DepartmentActivitesCalenderData/fetchDepartmentActivitesCalenderData', async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get('http://localhost:4000/api/getActivitesCalender');
      
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const DepartmentActivitesCalenderSlice = createSlice({
  name: 'DepartmentActivitesCalenderData',
  initialState: {
    DepartmentActivitesCalender: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentActivitesCalenderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentActivitesCalenderData.fulfilled, (state, action) => {
        state.loading = false;
        state.DepartmentActivitesCalender = action.payload; // Update state with the fetched data
      })
      .addCase(fetchDepartmentActivitesCalenderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default DepartmentActivitesCalenderSlice.reducer;
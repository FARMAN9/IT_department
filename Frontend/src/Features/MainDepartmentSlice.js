import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchMainDepartmentData = createAsyncThunk('MainDepartmentData/fetchMainDepartmentData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getMainInfo/');
    console.log('data',response.data.data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const MainDepartmentSlice = createSlice({
  name: 'MainDepartmentData',
  initialState: {
    MainDepartmentInfo: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainDepartmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.MainDepartmentInfo = action.payload; // Update state with the fetched data
      })
      .addCase(fetchMainDepartmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default MainDepartmentSlice.reducer;
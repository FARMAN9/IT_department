import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchStudentsData = createAsyncThunk('StudentsData/fetchStudentsData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getStudents'); // Replace with your API endpoint
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const StudentsSlice = createSlice({
  name: 'StudentsData',
  initialState: {
    students: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsData.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload; // Update state with the fetched data
      })
      .addCase(fetchStudentsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default StudentsSlice.reducer;